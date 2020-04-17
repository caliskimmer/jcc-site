import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from '@components/about/about.component';
import { ModuleWithProviders } from '@angular/core';

const router: Routes = [{ path: '', component: AboutComponent }];

export const aboutRouter: ModuleWithProviders = RouterModule.forChild(
  router,
);
