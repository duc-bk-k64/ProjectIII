
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import { AppRoutingUrl } from '../app-routing.url';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.authService.isAuthenticated()) {
            return true;
        }
        else {
            this.authService.setRedirectUrl(state.url);
            this.router.navigate([AppRoutingUrl.common.login]);
            return false;

        }

    }
}