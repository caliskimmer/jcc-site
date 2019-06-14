import { trigger, state, style, transition, animate } from '@angular/animations';

export const animations = [
  trigger('show-booking-form', [
    state('booking-form-on', style({
      visibility: 'visible',
      opacity: 1
    })),
    state('booking-form-off', style({
      visibility: 'hidden',
      opacity: 0
    })),
    transition('* => *', animate('300ms linear'))
  ]),
];
