import { Component, OnInit } from '@angular/core';
import {
  faFacebookSquare,
  faInstagram,
  faYelp,
} from '@fortawesome/free-brands-svg-icons';

import { Router } from '@angular/router';
import { popoverSections } from '@data/navigation-links.js';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  lists: any = popoverSections;
  faFacebookSquare: any = faFacebookSquare;
  faInstagram: any = faInstagram;
  faYelp: any = faYelp;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      window.scroll(0, 0);
    });
  }

  ngOnInit() {}

  urlName(linkName: string): string {
    return linkName
      .replace(/ /g, '-')
      .replace(/&/g, 'and')
      .toLowerCase();
  }
}
