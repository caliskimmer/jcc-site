import { AboutComponent } from '@components/about/about.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { aboutRouter } from '@components/about/about.router';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, aboutRouter],
  providers: [],
})
export class AboutUsModule {}
