import { RouterModule, Routes } from '@angular/router';

import { FaqsComponent } from '@components/faqs/faqs.component';
import { ModuleWithProviders } from '@angular/core';

const router: Routes = [
  {
    path: '',
    component: FaqsComponent,
  },
];

export const faqsRouter: ModuleWithProviders = RouterModule.forChild(
  router,
);
