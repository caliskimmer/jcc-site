import { CommonModule } from '@angular/common';
import { FaqsComponent } from '@components/faqs/faqs.component';
import { NgModule } from '@angular/core';
import { faqsRouter } from '@components/faqs/faqs.router';

@NgModule({
  declarations: [],
  imports: [CommonModule, FaqsComponent, faqsRouter],
})
export class FaqsModule {}
