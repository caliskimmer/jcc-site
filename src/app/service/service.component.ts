import { Component } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  services: Any = [{name: 'Wellness Care', id: 'wellness-care'},
                   {name: 'Sports Chiro', id: 'sports-chiro'},
                   {name: 'Prenatal Care', id: 'prenatal-care'},
                   {name: 'Graston Technique', id: 'graston-technique'},
                   {name: 'Rocktape', id: 'rocktape'},
                   {name: 'Massage Therapy', id: 'massage-therapy'},
                   {name: 'Senior Care', id: 'senior-care'}];
}
