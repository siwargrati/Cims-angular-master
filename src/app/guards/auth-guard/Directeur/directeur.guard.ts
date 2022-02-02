import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "../../../services/authentification/token-storage.service";

@Injectable({
  providedIn: "root"
})
export class DirecteurGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let token = sessionStorage.getItem("auth-token");
    if (
      token == null &&
      this.tokenStorage.getUser().roles == "ROLE_DIRECTEUR"
    ) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
