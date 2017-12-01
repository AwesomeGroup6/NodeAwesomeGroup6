import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from "./user";
import {Observable} from "rxjs/Observable";
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MediaServiceService {

  private testUrl = 'http://localhost:3000/';
  private realUrl = '';

  public results: string[];

  constructor( private http: HttpClient) { }

  //Make Http methods.
  getTestData (): Observable<User[]>{
    return this.http.get<User[]>(this.testUrl)
      .pipe(
        tap(user => console.log(user))
      );
  }

  logUserIn (email, pass) {
    this.http
      .post(this.testUrl, {email: email, password: pass}, )
      .subscribe(
        // Successful responses call the first callback.
        data => {
          console.log(data);
        },
        // Errors will call this callback instead:
        err => {
          console.log('Something went wrong!', err);
        }
      );
  }

  signUserUp (){
    this.http
      .post(this.testUrl+'/?', {email: "", password: ""})
      .subscribe(
        // Successful responses call the first callback.
        data => {
          console.log(data);
        },
        // Errors will call this callback instead:
        err => {
          console.log('Something went wrong!', err);
        }
      );
  }
}
