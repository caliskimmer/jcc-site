import { Directive } from '@angular/core';
import { HeaderComponent } from '../header/header.component'

@Directive({
  providers:[HeaderComponent],
  selector: '[addBackgroundOnScroll]'
})

export class AddBackgroundOnScrollDirective {

  constructor(private header: HeaderComponent) {
    console.log("Test!");
  }
  
  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);    
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (): void => {
    //Dropdown header background
    if (window.scrollY > 0 && (this.header.state == 'above' || this.header.state == '')) {
      this.header.moveDown();
    } else if (window.scrollY == 0 && this.header.state == 'below') {
      this.header.moveDown();
    }
  };
}