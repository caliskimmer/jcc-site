import { Component, OnInit } from '@angular/core';
import { popoverSections } from '../data/navigation-links.js';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  lists: any = popoverSections;

  constructor() {}

  ngOnInit() {
  }

  urlName(linkName: string): string {
    return linkName.replace(/ /g, '-').replace(/&/g, 'and').toLowerCase();
  }

}
