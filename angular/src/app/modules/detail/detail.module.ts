import { CommonModule } from '@angular/common';
import { DetailComponent } from '@components/detail/detail.component';
import { DetailResolver } from '@components/detail/detail.resolver';
import { EscapeHtmlPipe } from '@pipes/keep-html.pipe';
import { NgModule } from '@angular/core';
import { detailRouter } from '@components/detail/detail.router';

@NgModule({
  declarations: [DetailComponent, EscapeHtmlPipe],
  imports: [CommonModule, detailRouter],
  providers: [DetailResolver],
})
export class DetailModule {}
