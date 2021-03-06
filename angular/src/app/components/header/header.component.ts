import {
  Component,
  HostListener,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { animations } from './header.animations';
import throttle from 'lodash.throttle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: animations,
})
export class HeaderComponent implements OnInit {
  state = 'above';
  prevHeaderState = '';
  menuState = 'menu-off';
  header: HeaderComponent = this;
  onDetail = false;
  navListLeft = ['About Us', 'Services', 'Conditions Treated'];
  navListRight = ['New Patient Center', 'Blog'];
  navList: string[] = this.navListLeft.concat(this.navListRight);
  currPopIndex = -1;
  throttleMoveDown = throttle(this.moveDown, 500);

  @ViewChildren('p') popovers: QueryList<NgbPopover>;

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onDetail = !this.router.url.includes('home');
        if (this.onDetail) this.state = 'below';
        if (!this.onDetail && window.scrollY <= 0) {
          this.state = 'above';
        }
      }
    });
  }

  mouseenter(e) {
    this.currPopIndex = this.navList.indexOf(e.target.innerText);
    const currPopover: NgbPopover = this.popovers.toArray()[
      this.currPopIndex
    ];
    currPopover.open();
  }

  mouseleave() {
    this.popovers.toArray()[this.currPopIndex].close();
  }

  @HostListener('window:scroll', ['event'])
  onScroll() {
    this.throttleMoveDown();
  }

  moveDown() {
    if (window.scrollY > 0 && this.state === 'below') return;
    else if (window.scrollY <= 0 && this.state !== 'below') return;
    else if (this.onDetail) return;

    this.state = this.state === 'below' ? 'above' : 'below';
  }

  toggleMenu() {
    if (this.menuState === 'menu-off') {
      this.menuState = 'menu-on';
      this.prevHeaderState = this.state;
      this.state = 'below';
      this.renderer.addClass(document.body, 'modal-open');
    } else {
      this.menuState = 'menu-off';
      if (!this.onDetail) this.state = this.prevHeaderState;
      this.renderer.removeClass(document.body, 'modal-open');
    }
  }
}
