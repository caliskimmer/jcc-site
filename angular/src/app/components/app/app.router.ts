import { RouterModule, Routes } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';

export const router: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
      path: '**',
      redirectTo: '/home',
    },
    {
        path: '/home',
        loadChildren: '@modules/home/home.module#HomeModule'
    }
  {
    path: '/about-us',
    loadChildren: '@modules/about/about.module#AboutModule',
  },
  {
      path: '/faqs',
      loadChildren: '@modules/faqs/faqs.module#FAQModule'
  }
  {
    path: '/',
    loadChildren: '@modules/detail/detail.module#ServiceModule',
  },
];

export const appRouter: ModuleWithProviders = RouterModule.forRoot(
  router,
);
