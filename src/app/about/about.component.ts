import { Component, OnInit } from '@angular/core';
import employeeBios from '../data/employee-bios.js';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  employees: any[] = employeeBios;
  constructor() {}

  ngOnInit() {}
}
