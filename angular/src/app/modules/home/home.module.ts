import { CommonModule } from '@angular/common';
import { HomeComponent } from '@components/home/home.component';
import { MainComponent } from '@components/main/main.component';
import { NgModule } from '@angular/core';
import { QuoteComponent } from '@components/quote/quote.component';
import { ServiceComponent } from '@components/service/service.component';

@NgModule({
  declarations: [
    HomeComponent,
    QuoteComponent,
    ServiceComponent,
    MainComponent,
  ],
  imports: [CommonModule],
})
export class HomeModule {}
