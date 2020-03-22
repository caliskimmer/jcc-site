import { Component, Input, OnInit } from '@angular/core';

import { PopoverService } from '../popover-service/popover-service.service';
import { Router } from '@angular/router';
import { popoverSections } from '../data/navigation-links';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() linkName: string;

  constructor(
    public popoverService: PopoverService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.jumpToTop();
    });
  }

  displayContent(): any[] {
    return this.linkName in popoverSections
      ? popoverSections[this.linkName]
      : [];
  }

  jumpToTop() {
    window.scroll(0, 0);
  }
}
