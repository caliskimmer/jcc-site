import { Component, AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { animations } from './header.animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: animations 
})
export class HeaderComponent implements AfterViewInit {
  state:string = ''
  poppers:Popper[] = []
  @ViewChild('popper') popperDiv: ElementRef;
  @ViewChildren('headerLink') links:QueryList<ElementRef>

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.links.forEach((link) => {
      this.poppers.push(new Popper(link.nativeElement, this.popperDiv.nativeElement, {placement: 'bottom'}));
    }
    console.log(this.poppers);
  }

  mouseEnter(e) {
    this.renderer.removeClass(this.popperDiv.nativeElement, "invisible");
  }

  mouseLeave(e) {
    this.renderer.addClass(this.popperDiv.nativeElement, "invisible");
  }
    
  //called on window scroll event
  moveDown() {
     this.state = (this.state === 'below') ? 'above' : 'below';
  }

}
