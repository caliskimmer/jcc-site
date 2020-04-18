import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ContactComponent } from '@components/contact/contact.component';
import { HomeComponent } from '@components/home/home.component';
import { MainComponent } from '@components/main/main.component';
import { NgModule } from '@angular/core';
import { QuoteComponent } from '@components/quote/quote.component';
import { ServiceComponent } from '@components/service/service.component';
import { homeRouter } from '@components/home/home.router';

@NgModule({
  declarations: [
    HomeComponent,
    QuoteComponent,
    ServiceComponent,
    MainComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    homeRouter,
  ],
})
export class HomeModule {}
