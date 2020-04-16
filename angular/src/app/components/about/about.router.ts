import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from '@components/about/about.component';
import { DetailComponent } from '@components/detail/detail.component';
import { DetailResolver } from '@components/detail/detail.resolver';
import { ModuleWithProviders } from '@angular/core';

const router: Routes = [
  {
    path: '',
    component: DetailComponent,
    resolve: { content: DetailResolver },
  },
  { path: '/meet-the-team', component: AboutComponent },
  {
    path: '/philosophy',
    component: DetailComponent,
    resolve: { content: DetailResolver },
  },
];

export const aboutRouter: ModuleWithProviders = RouterModule.forChild(
  router,
);
