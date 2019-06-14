import { trigger, state, style, transition, animate, query, animateChild, group} from '@angular/animations';

export const animations = [
  trigger('moveDown', [
    state('below', style({
      transform: 'translateY(100px)'
    })),
    state('above', style({
      transform: 'translateY(-100px)'
    })),
    transition('below => above', animate('300ms linear')),
    transition('above => below', animate( '300ms linear'))
  ]),
 trigger('recolor', [
   state('below', style({
     filter: 'invert(100%)'
  })),
   state('above', style({
     filter: 'invert(0%)'
  })),
  transition('* <=> *', animate('300ms linear')),
 ]),
 trigger('swapLogo', [
  state('below', style({
    transform: 'scale(0.7)',
    //filter: 'invert(100%)'
    'background-image': 'url(../../assets/jcc-logo-md-black.png)',
  })),
  state('above', style({
    transform: 'scale(1.0)',
    //filter: 'invert(0%)'
    'background-image': 'url(../../assets/jcc-logo-md.png)'
  })),
  transition('* <=> *', animate('300ms linear')),
  ]),
 trigger('swapLogoMobile', [
   state('below', style({
     // 0.81 to prevent weird pixel shift
     transform: 'scale(0.81)',
     'background-image': 'url(../../assets/jcc-logo-sm-black.png)',
  })),
  state('above', style({
    transform: 'scale(1.0)',
    'background-image': 'url(../../assets/jcc-logo-sm-white.png)'
  })),
  transition('* <=> *', animate('300ms linear')),
  ]),
 trigger('shiftUp', [
  state('below', style({
    transform: 'translateY(-15px)'
  })),
  state('above', style({
    transform: 'translateY(0px)'
  })),
  transition('* <=> below',
            group([query('@recolor', animateChild(), { optional: true }),
                   query('@swapLogo', animateChild()),
                   animate('300ms linear')]))
 ]),
 trigger('shiftUpMobile', [
  state('below', style({
    transform: 'translateY(-15px)'
  })),
  state('above', style({
    transform: 'translateY(0px)'
  })),
  transition('* <=> below',
            group([query('@recolor', animateChild(), { optional: true }),
                   query('@swapLogoMobile', animateChild()),
                   animate('300ms linear')]))
 ]),
 trigger('mobile-menu-slide', [
  state('menu-on', style({
    display: 'block',
    top: '100px'
  })),
  state('menu-off', style({
    bottom: '-100%',
    display: 'hidden'
  })),
  transition('menu-off => menu-on', animate('500ms ease-out')),
  transition('menu-on => menu-off', animate('500ms ease-in'))
 ])
];
