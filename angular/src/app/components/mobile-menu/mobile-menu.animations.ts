import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animations = [
  trigger('anim-collapse', [
    state(
      'initial',
      style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
      }),
    ),
    state(
      'final',
      style({
        overflow: 'hidden',
        opacity: '1',
      }),
    ),
    transition('initial => final', animate('250ms ease-out')),
    transition('final => initial', animate('250ms ease-in')),
  ]),
];
