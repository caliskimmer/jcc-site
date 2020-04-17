import { RouterModule, Routes } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';

export const router: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: '@modules/home/home.module#HomeModule',
  },
  {
    path: 'about-us/meet-the-team',
    loadChildren: '@modules/about-us/about-us.module#AboutUsModule',
  },
  {
    path: '',
    loadChildren: '@modules/detail/detail.module#DetailModule',
  },
  {
    path: 'faqs',
    loadChildren: '@modules/faqs/faqs.module#FaqsModule',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

export const appRouter: ModuleWithProviders = RouterModule.forRoot(
  router,
);
