import { Component, OnInit } from '@angular/core';
import { animations } from './header.animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: animations 
})
export class HeaderComponent implements OnInit {
  state:string = ''

  constructor() { }

  ngOnInit() {
  }

  //called on window scroll event
  moveDown() {
     console.log("THIS IS A TEST");
     this.state = (this.state === 'below') ? 'above' : 'below';
  }
}
