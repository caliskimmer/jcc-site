import { Component, Input, OnChanges } from '@angular/core';

import { HeaderComponent } from '../header/header.component';
import { PopoverService } from '../popover/popover.service';
import { popoverSections } from '../data/navigation-links.js';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent implements OnChanges {
  @Input() header: HeaderComponent;
  menuItems: any[];

  constructor(public popoverService: PopoverService) {}

  ngOnChanges() {
    this.menuItems = [];
    for (const item of this.header.navList) {
      this.menuItems.push({
        item: item,
        isCollapsed: true,
        children: popoverSections[item],
      });
    }
  }
}
