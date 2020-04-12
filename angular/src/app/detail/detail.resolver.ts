import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DetailResolver implements Resolve<Observable<string>> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot): Observable<string> {
    return this.getDetail(route);
  }

  getDetail(route: ActivatedRouteSnapshot): Observable<string> {
    const detailCategory = route.url[0].path;
    let currentDetail: string;
    if (route.url.length > 1) currentDetail = route.url[1].path;

    let fileLoc = null;
    if (!currentDetail) {
      // load global page
      fileLoc = `assets/docs/detail/${detailCategory}/${detailCategory}.html`;
    } else {
      // load detail page
      fileLoc = `assets/docs/detail/${detailCategory}/${currentDetail}.html`;
    }
    const httpResponse = this.http.get(fileLoc, {
      responseType: 'html' as 'text',
    });

    return httpResponse;
  }
}
