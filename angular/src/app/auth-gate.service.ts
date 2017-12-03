import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import {ToastsManager} from "ng2-toastr";

@Injectable()
export class AuthGateService {

  private testUrl = 'http://localhost:3000/';
  private token: string;


  constructor(public authHttp: AuthHttp, private push: ToastsManager) { }


 //TODO all request in here



}
