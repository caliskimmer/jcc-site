import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animations = [
  trigger('moveDown', [
    state(
      'below',
      style({
        transform: 'translateY(100px)',
      }),
    ),
    state(
      'above',
      style({
        transform: 'translateY(-100px)',
      }),
    ),
    transition('below <=> above', animate('300ms linear')),
  ]),
  trigger('recolor', [
    state(
      '0',
      style({
        filter: 'invert(100%)',
      }),
    ),
    state(
      '1',
      style({
        filter: 'invert(0%)',
      }),
    ),
    transition('0 <=> 1', animate('300ms linear')),
  ]),
  trigger('resizeLogo', [
    state(
      'below',
      style({
        transform: 'scale(0.7)',
      }),
    ),
    state(
      'above',
      style({
        transform: 'scale(1.0)',
      }),
    ),
    transition('below <=> above', animate('300ms linear')),
  ]),
  trigger('swapLogo', [
    state(
      '0',
      style({
        'background-image': 'url(../../assets/jcc-logo-md-black.png)',
      }),
    ),
    state(
      '1',
      style({
        'background-image': 'url(../../assets/jcc-logo-md.png)',
      }),
    ),
    transition('0 <=> 1', animate('300ms linear')),
  ]),
  trigger('swapLogoMobile', [
    state(
      'below',
      style({
        'background-image': 'url(../../assets/jcc-logo-sm-black.png)',
      }),
    ),
    state(
      'above',
      style({
        'background-image': 'url(../../assets/jcc-logo-sm-white.png)',
      }),
    ),
    transition('below <=> above', animate('300ms linear')),
  ]),
  trigger('resizeLogoMobile', [
    state(
      'below',
      style({
        // 0.81 to prevent weird pixel shift
        transform: 'scale(0.81)',
      }),
    ),
    state(
      'above',
      style({
        transform: 'scale(1.0)',
      }),
    ),
    transition('below <=> above', animate('300ms linear')),
  ]),
  trigger('shiftUp', [
    state(
      'below',
      style({
        transform: 'translateY(-15px)',
      }),
    ),
    state(
      'above',
      style({
        transform: 'translateY(0px)',
      }),
    ),
    transition(
      'below <=> above',
      group([
        query('@recolor', animateChild(), { optional: true }),
        query('@swapLogo', animateChild(), { optional: true }),
        query('@resizeLogo', animateChild(), { optional: true }),
        animate('300ms linear'),
      ]),
    ),
  ]),
  trigger('shiftUpMobile', [
    state(
      'below',
      style({
        transform: 'translateY(-15px)',
      }),
    ),
    state(
      'above',
      style({
        transform: 'translateY(0px)',
      }),
    ),
    transition(
      '* <=> below',
      group([
        query('@recolor', animateChild(), { optional: true }),
        query('@swapLogoMobile', animateChild(), { optional: true }),
        query('@resizeLogoMobile', animateChild(), {
          optional: true,
        }),
        animate('300ms linear'),
      ]),
    ),
  ]),
  trigger('mobile-menu-slide', [
    state(
      'menu-on',
      style({
        display: 'block',
        top: '100px',
      }),
    ),
    state(
      'menu-off',
      style({
        bottom: '-100%',
        display: 'hidden',
      }),
    ),
    transition('menu-off => menu-on', animate('500ms ease-out')),
    transition('menu-on => menu-off', animate('500ms ease-in')),
  ]),
];
