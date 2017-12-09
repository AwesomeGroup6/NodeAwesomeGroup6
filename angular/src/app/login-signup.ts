import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Router} from "@angular/router";

@Injectable()
export class MediaServiceService {


  private testUrl = 'http://localhost:3000/';



  constructor( private http: HttpClient, private push: ToastsManager, private router:Router) {}


  logUserIn (email, pass) {
    this.http
      .post(this.testUrl + 'public/login', {email: email, password: pass}, )
      .subscribe(
        // Successful responses call the first callback.
        data => {
            let token = data['token'];
            localStorage.setItem('token', token );
            localStorage.setItem('email', email);
            if(data['success']) {
              this.router.navigate(['home']);
            }
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
      .post(this.testUrl+'public/signup', {email: email, password: pass, firstname: first, lastname: last})
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
