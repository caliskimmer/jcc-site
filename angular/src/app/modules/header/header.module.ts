import { CommonModule } from '@angular/common';
import { MobileMenuComponent } from '@components/mobile-menu/mobile-menu.component';
import { NgModule } from '@angular/core';
import { PopoverComponent } from '@components/popover/popover.component';

@NgModule({
  declarations: [MobileMenuComponent, PopoverComponent],
  imports: [CommonModule],
})
export class HeaderModule {}
