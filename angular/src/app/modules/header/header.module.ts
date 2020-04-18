import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@components/header/header.component';
import { MobileMenuComponent } from '@components/mobile-menu/mobile-menu.component';
import { NgModule } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { PopoverComponent } from '@components/popover/popover.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    MobileMenuComponent,
    PopoverComponent,
  ],
  imports: [CommonModule, NgbPopoverModule, RouterModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
