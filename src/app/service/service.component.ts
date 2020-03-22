import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent {
  services: any = [
    {
      name: 'Wellness Care',
      id: 'wellness-care',
      quote: {
        text:
          "Even people who aren't sick may not have optimal wellness",
        author: 'Brian Carter',
      },
    },
    {
      name: 'Sports Chiropractic',
      id: 'sports-chiropractic',
      quote: {
        text: 'A feeble body weakens the mind',
        author: 'Jean-Jacques Rousseau',
      },
    },
    {
      name: 'Prenatal Care',
      id: 'prenatal-care',
      quote: {
        text: 'You are the closest I will ever come to magic',
        author: 'Suzanna Finnamore',
      },
    },
    {
      name: 'Graston Technique',
      id: 'graston-technique',
      quote: {
        text: 'The best people all have some kind of scar',
        author: 'Kiera Cass',
      },
    },
    {
      name: 'Rocktape',
      id: 'rocktape',
      quote: {
        text:
          'Never let a stumble in the road be the end of a journey',
        author: 'Unknown',
      },
    },
    {
      name: 'Massage Therapy',
      id: 'massage-therapy',
      quote: {
        text: "My massage therapy is not a luxury, it's a necessity",
        author: 'Unknown',
      },
    },
    {
      name: 'Senior Care',
      id: 'senior-care',
      quote: {
        text: 'We must learn as long as we live',
        author: 'Lailah Gifty Akita',
      },
    },
  ];

  constructor(private router: Router) {}

  goToService(id: string) {
    this.router.navigate([`/services/${id}`]);
  }
}
