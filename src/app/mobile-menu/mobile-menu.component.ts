import { Component, Input, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent {
  @Input() header:HeaderComponent;
  constructor(private renderer: Renderer2) {}
  
  close() {
    this.renderer.removeClass(document.body, 'modal-open');
    this.header.menuState = 'menu-off';
  }
}
