import {Component, Input}  from '@angular/core';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';

import {popoverSections} from '../data/navigation-links';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {
  @Input() linkName: string;

  constructor() { }
  
  urlName(linkName: string): string {
    return linkName.replace(/ /g, '-').replace(/&/g, 'and').toLowerCase();
  }

  displayContent(): any[] {
    return (this.linkName in popoverSections) ? popoverSections[this.linkName] : [];
  }
}
