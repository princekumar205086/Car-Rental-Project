import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard  {
  constructor(private  authService: AuthService,
              private  toastrService: ToastrService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['login']);
      this.toastrService.info('Sisteme giriş yapmalısınız!');
      return false;
    }
  }

}
