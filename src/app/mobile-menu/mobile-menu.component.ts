import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
} from '@angular/core';

import { HeaderComponent } from '../header/header.component';
import { PopoverService } from '../popover-service/popover-service.service';
import { Router } from '@angular/router';
import { popoverSections } from '../data/navigation-links.js';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent implements OnChanges, OnInit {
  @Input() header: HeaderComponent;
  menuItems: any[];

  constructor(
    private renderer: Renderer2,
    private popoverService: PopoverService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.close();
    });
  }

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

  close() {
    this.renderer.removeClass(document.body, 'modal-open');
    this.header.menuState = 'menu-off';

    if (!this.header.detailPresent()) {
      this.header.state = this.header.prevHeaderState;
    }
  }
}
