import { Component, ViewChildren, ElementRef } from '@angular/core';
import { animations } from './header.animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: animations
})
export class HeaderComponent { 
  state:string = ''
  navListLeft: string[] = ['About Us', 'Services', 'Conditions Treated']
  navListRight: string[] = ['New Patient Center', 'Blog', 'FAQs']
  navList: string[] = this.navListLeft.concat(this.navListRight)
  currPopIndex: number = -1

  @ViewChildren('p') popovers: QueryList<ngbPopover>

  constructor() { }
    
  mouseenter(e) {
    this.currPopIndex = this.navList.indexOf(e.target.innerText);
    this.popovers.toArray()[this.currPopIndex].open();
  }

  mouseleave(e) {
    this.popovers.toArray()[this.currPopIndex].close();
  }

  //called on window scroll event
  moveDown() {
     this.state = (this.state === 'below') ? 'above' : 'below'
  }
}
