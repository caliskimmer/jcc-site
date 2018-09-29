import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import { Component, ViewChildren, QueryList, OnInit} from '@angular/core';
import { animations } from './header.animations';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: animations
})
export class HeaderComponent { 
  state:string = '';
  onDetail:boolean = false;
  navListLeft: string[] = ['About Us', 'Services', 'Conditions Treated'];
  navListRight: string[] = ['New Patient Center', 'Blog', 'FAQs'];
  navList: string[] = this.navListLeft.concat(this.navListRight);
  currPopIndex: number = -1;

  @ViewChildren('p') popovers: QueryList<NgbPopover>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onDetail = (this.router.url !== '/home' && this.router.url !== '/');
      }
    });
  }

  mouseenter(e) {
    this.currPopIndex = this.navList.indexOf(e.target.innerText);
    let currPopover:NgbPopover = this.popovers.toArray()[this.currPopIndex];
    currPopover.open();
  }

  mouseleave(e) {
    this.popovers.toArray()[this.currPopIndex].close();
  }

  //called on window scroll event
  moveDown() {
     if (!this.onDetail) {
        this.state = (this.state === 'below') ? 'above' : 'below';
     }
  }

  // Determines when to enable or disable animations
  detailPresent() {
    return this.onDetail;    
  }
}
