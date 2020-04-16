import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '@components/home/home.component';
import { ModuleWithProviders } from '@angular/core';

const router: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

export const homeRouter: ModuleWithProviders = RouterModule.forChild(
  router,
);
