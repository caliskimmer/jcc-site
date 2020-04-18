import {
  animate,
  sequence,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animations = [
  trigger('show-booking-form', [
    state(
      'booking-form-on',
      style({
        visibility: 'visible',
        opacity: 1,
      }),
    ),
    state(
      'booking-form-off',
      style({
        visibility: 'hidden',
        opacity: 0,
      }),
    ),
    transition('booking-form-on => booking-form-off', [
      sequence([
        animate('300ms linear', style({ opacity: 0 })),
        style({
          visibility: 'hidden',
        }),
      ]),
    ]),
    transition('booking-form-off => booking-form-on', [
      sequence([
        style({
          visibility: 'visible',
        }),
        animate('300ms linear', style({ opacity: 1 })),
      ]),
    ]),
  ]),
];
