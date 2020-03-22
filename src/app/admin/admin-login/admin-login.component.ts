import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed: boolean;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit() {
    const loginSucceeded = await this.adminService.login(
      this.loginForm.value,
    );
    if (!loginSucceeded) {
      this.loginFailed = true;
      return;
    }

    this.loginFailed = false;
  }
}
