import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

//import { AngularFireAuth } from '@angular/fire/auth';
import {map}from "rxjs/operators";
import {isNullOrUndefined} from "util";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private AFauth :AngularFireAuth, private router: Router){}

  canActivate( 
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): UrlTree | Observable<boolean> | Promise<boolean> | boolean {
   
     return this.AFauth.authState.pipe(map(auth => { 
      
    if(isNullOrUndefined(auth)){
        this.router.navigate(['/login']);
         return false;
      }else{
        return true;
       }
    }))
  }
}
