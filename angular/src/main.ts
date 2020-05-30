import { AppModule } from '@modules/app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from '@environments/environment.prod';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
