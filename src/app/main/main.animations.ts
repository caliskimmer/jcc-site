import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animations = [
  trigger('show-contact-form', [
    state(
      'contact-form-on',
      style({
        visibility: 'visible',
        opacity: 1,
      }),
    ),
    state(
      'contact-form-off',
      style({
        visibility: 'hidden',
        opacity: 0,
      }),
    ),
    transition('* => *', animate('300ms linear')),
  ]),
];
