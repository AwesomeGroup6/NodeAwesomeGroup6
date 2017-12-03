import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from "./user";
import {Observable} from "rxjs/Observable";
import { catchError, map, tap } from 'rxjs/operators';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Router} from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MediaServiceService {


  private testUrl = 'http://localhost:3000/';
  private currentUser;



  constructor( private http: HttpClient, private push: ToastsManager, private router:Router) {}


  logUserIn (email, pass) {
    this.http
      .post(this.testUrl + 'public/login', {email: email, password: pass}, )
      .subscribe(
        // Successful responses call the first callback.
        data => {
          this.currentUser = { 'email': data['email'],
            'token':data['token']};
          if(this.currentUser) {
            localStorage.setItem('currentUser', this.currentUser );
          }
          this.router.navigate(['home']);
          console.log(data);
        },
        // Errors will call this callback instead:
        err => {
          this.push.error('Either password or email was incorrect', 'Login incorrect');
          console.log('Something went wrong!', err);
        }
      );
  }
  signUserUp (email, pass, first, last, phone, bod, gender){
    this.http
      .post(this.testUrl+'public/signup', {Email: email, Password: pass, FirstName: first, LastName: last})
      .subscribe(
        // Successful responses call the first callback.
        data => {
          this.router.navigate(['login']);
          console.log(data);
        },
        // Errors will call this callback instead:
        err => {
          this.push.error('Try again', 'An error occurred');
          console.log('Something went wrong!', err);
        }
      );
  }

}
