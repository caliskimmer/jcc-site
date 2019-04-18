import {Component, Input}  from '@angular/core';
import {popoverSections} from '../data/navigation-links';
import {PopoverService} from '../popover-service/popover-service.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {
  @Input() linkName: string;

  constructor(private popoverService: PopoverService) { }

  displayContent(): any[] {
    return (this.linkName in popoverSections) ? popoverSections[this.linkName] : [];
  }
}
