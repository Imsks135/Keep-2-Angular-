import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { RouterService } from '../router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit { 
  loginForm: FormGroup = new FormGroup({});
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private routerService: RouterService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.authenticateUser(username, password).subscribe(
        (response) => {
          this.errorMessage = '';
          this.authService.setBearerToken('dummy_token');
          this.routerService.routeToDashboard();
        },
        (error) => {
          this.errorMessage = 'Wrong Credentials';
        }
      );
    }
  }
}
