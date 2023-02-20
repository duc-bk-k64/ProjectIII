import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AppRoutingUrl } from "../app-routing.url";

@Injectable()
export class AuthGuardTeacher implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem("role") == "TEACHER") {
            return true;
        }
        else {
            this.router.navigate([AppRoutingUrl.common.access_denied]);
            return false;

        }

    }
}