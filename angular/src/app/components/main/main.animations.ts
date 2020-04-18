import {
  animate,
  sequence,
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
        opacity: 1,
        visibility: 'visible',
      }),
    ),
    state(
      'contact-form-off',
      style({
        opacity: 0,
        visibility: 'hidden',
      }),
    ),
    transition('contact-form-on => contact-form-off', [
      sequence([
        animate('300ms linear', style({ opacity: 0 })),
        style({
          visibility: 'hidden',
        }),
      ]),
    ]),
    transition('contact-form-off => contact-form-on', [
      sequence([
        style({
          visibility: 'visible',
        }),
        animate('300ms linear', style({ opacity: 1 })),
      ]),
    ]),
  ]),
];
