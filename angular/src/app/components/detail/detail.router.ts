import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from '@components/detail/detail.component';
import { DetailResolver } from '@components/detail/detail.resolver';
import { ModuleWithProviders } from '@angular/core';

const router: Routes = [
  {
    path: 'services',
    component: DetailComponent,
    resolve: { content: DetailResolver },
  },
  {
    path: 'services/:service',
    component: DetailComponent,
    resolve: { content: DetailResolver },
  },
  {
    path: 'conditions-treated',
    component: DetailComponent,
    resolve: { content: DetailResolver },
  },
  {
    path: 'conditions-treated/:condition',
    component: DetailComponent,
    resolve: { content: DetailResolver },
  },
  {
    path: 'new-patient-center',
    component: DetailComponent,
    resolve: { content: DetailResolver },
  },
  {
    path: 'new-patient-center/:patient-info',
    component: DetailComponent,
    resolve: { content: DetailResolver },
  },
];

export const detailRouter: ModuleWithProviders = RouterModule.forChild(
  router,
);
