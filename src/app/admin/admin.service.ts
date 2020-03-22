import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private router: Router) {}

  async login(formInput: any) {
    try {
      const result = await this.http
        .post(`${environment.api}/login`, formInput)
        .toPromise();
      const user = result['user'];

      localStorage.setItem('token', user['token']);
      this.router.navigate(['/admin']);
      return true;
    } catch (err) {
      if (err.status === 403) {
      } else {
        console.log(
          `An error occurred submitting login form => ${err.message}`,
        );
      }

      return false;
    }
  }
}
