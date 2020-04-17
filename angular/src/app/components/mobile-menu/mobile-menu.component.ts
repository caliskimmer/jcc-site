import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { HeaderComponent } from '../header/header.component';
import { PopoverService } from '../popover/popover.service';
import { animations } from './mobile-menu.animations';
import { popoverSections } from '@data/navigation-links.js';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  animations: animations,
})
export class MobileMenuComponent implements OnInit, OnChanges {
  @Input() header: HeaderComponent;
  @Input() state: string;
  menuItems: any[];

  constructor(public popoverService: PopoverService) {}

  ngOnInit() {
    this.menuItems = [];
    for (const item of this.header.navList) {
      this.menuItems.push({
        item: item,
        isCollapsed: true,
        children: popoverSections[item],
      });
    }
  }

  ngOnChanges() {
    if (this.state !== 'menu-off' || !this.menuItems) {
      return;
    }

    for (const item of this.menuItems) {
      item.isCollapsed = true;
    }
  }
}
