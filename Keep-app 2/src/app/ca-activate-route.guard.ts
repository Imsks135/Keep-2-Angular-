import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateRouteGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    const token = this.authService.getBearerToken();
    if (token) {
      return this.authService
        .isUserAuthenticated(token)
        .toPromise()
        .then(
          (response) => {
            if (response && response.isAuthenticated) {
              return true;
            } else {
              this.router.navigate(['/login']);
              return false;
            }
          },
          () => {
            this.router.navigate(['/login']);
            return false;
          }
        );
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
