import { Directive, OnInit, OnDestroy } from '@angular/core';

import * as _ from 'lodash';

import { HeaderComponent } from '../header/header.component';

@Directive({
  providers: [HeaderComponent],
  selector: '[addBackgroundOnScroll]',
})
export class AddBackgroundOnScrollDirective
  implements OnInit, OnDestroy {
  throttledScroll: any;

  constructor(private header: HeaderComponent) {}

  ngOnInit() {
    this.throttledScroll = _.throttle(this.scroll, 500);
    window.addEventListener('scroll', this.throttledScroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.throttledScroll, true);
  }

  scroll = (): void => {
    // Dropdown header background
    if (
      window.scrollY > 0 &&
      (this.header.state === 'above' || this.header.state === '')
    ) {
      this.header.moveDown();
    } else if (
      window.scrollY === 0 &&
      this.header.state === 'below'
    ) {
      this.header.moveDown();
    }
  };
}
