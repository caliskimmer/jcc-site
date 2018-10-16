import { Component, Input, Renderer2, OnChanges} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { popoverSections } from '../data/navigation-links.js';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent implements OnChanges{
  @Input() header:HeaderComponent;
  menuItems:any[];
  constructor(private renderer: Renderer2) {
  }

  ngOnChanges() {
    this.menuItems = [];
    for (let item of this.header.navList) {
      this.menuItems.push({item: item, isCollapsed: true, children: popoverSections[item]});  
    }
  }
  
  close() {
    this.renderer.removeClass(document.body, 'modal-open');
    this.header.menuState = 'menu-off';
  }
}
