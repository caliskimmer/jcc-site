import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import { Component, ViewChildren, QueryList, Renderer2, OnInit} from '@angular/core';
import { animations } from './header.animations';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: animations
})
export class HeaderComponent implements OnInit {
  state = '';
  prevHeaderState = '';
  menuState = 'menu-off';
  header: HeaderComponent = this;
  onDetail = false;
  navListLeft: string[] = ['About Us', 'Services', 'Conditions Treated'];
  navListRight: string[] = ['New Patient Center', 'Blog'];
  navList: string[] = this.navListLeft.concat(this.navListRight);
  currPopIndex = -1;

  @ViewChildren('p') popovers: QueryList<NgbPopover>;

  constructor(private router: Router, private renderer: Renderer2) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onDetail = (!this.router.url.includes('home'));

        if (this.onDetail) {
            this.state = 'below';
        }

        if (!this.onDetail && window.scrollY <= 0) {
            this.state = 'above';
        }
      }
    });
  }

  mouseenter(e) {
    this.currPopIndex = this.navList.indexOf(e.target.innerText);
    const currPopover: NgbPopover = this.popovers.toArray()[this.currPopIndex];
    currPopover.open();
  }

  mouseleave(e) {
    this.popovers.toArray()[this.currPopIndex].close();
  }

  // called on window scroll event
  moveDown() {
      if (!this.onDetail) {
          this.state = (this.state === 'below') ? 'above' : 'below';
      }
  }

  moveMenu() {
    this.menuState = (this.menuState === 'menu-off') ? 'menu-on' : 'menu-off';
    this.prevHeaderState = this.state;

    if (!this.onDetail) {
        this.state = 'below';
    }

    this.renderer.addClass(document.body, 'modal-open');
  }

  // Determines when to enable or disable animations
  detailPresent() {
    return this.onDetail;
  }
}
