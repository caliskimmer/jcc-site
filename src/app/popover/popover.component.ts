import {Component, Input}  from '@angular/core';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {
  @Input() linkName: string;

  popoverSections: any = {
    'About Us': ['Meet the Team', 'Philosophy'],
    'Services': [
      'Wellness Care',
      'Sports Chiropractic',
      'Prenatal Care',
      'Graston Technique',
      'Rocktape',
      'Massage Therapy',
      'Senior Care'
    ],
    'Conditions Treated': [
      'Back Pain',
      'Lower Back Pain',
      'Neck Pain',
      'Shoulder Pain',
      'Fibromyalgia',
      'Headaches & Migraines',
      'Whiplash',
      'Herniated Discs',
      'Sciatica Treatment',
      'Pinched Nerve'
    ],
    'New Patient Center': [
      'Online Forms',
      'Payment Options'
    ]
  };

  constructor() { }

  displayContent(): any[] {
    return (this.linkName in this.popoverSections) ? this.popoverSections[this.linkName] : [];
  }
}
