import { trigger, state, style, transition, animate, query, animateChild, group} from '@angular/animations';

export const animations = [
  trigger('moveDown', [
    state('below', style({
      transform: 'translateY(80px)'
    })),
    state('above', style({
      transform: 'translateY(-80px)'
    })),
  transition('below => above', animate('300ms linear')),
  transition('* => below', animate('300ms linear'))
  ]),
 trigger('recolor', [
  state('below', style({
    color: 'rgb(52, 58, 64)'
  })),
  state('above', style({
    color: 'white'
  })),
  transition('* <=> below', animate('300ms linear')),
 ]),
 trigger('swapLogo', [
  state('below', style({
    transform: 'scale(0.7)',
    'background-image': 'url(../../assets/jcc-logo-md-black.png)',
  })),
  state('above', style({
    transform: 'scale(1.0)',
    'background-image': 'url(../../assets/jcc-logo-md.png)'
  })),
  transition('* <=> below', animate('300ms linear')),
  ]),
 trigger('shiftUp', [
  state('below', style({
    transform: 'translateY(-25px)'
  })),
  state('above', style({
    transform: 'translateY(0px)'
  })),
  transition('* <=> below',
            group([query('@recolor', animateChild(), { optional: true }),
                   query('@swapLogo', animateChild()),
                   animate('300ms linear')]))
 ])
];
