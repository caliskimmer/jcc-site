import { CommonModule } from '@angular/common';
import { FaqsComponent } from '@components/faqs/faqs.component';
import { NgModule } from '@angular/core';
import { faqsRouter } from '@components/faqs/faqs.router';

@NgModule({
  declarations: [FaqsComponent],
  imports: [CommonModule, faqsRouter],
})
export class FaqsModule {}
