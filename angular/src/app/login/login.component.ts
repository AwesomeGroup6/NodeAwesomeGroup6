///<reference path="../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {MediaServiceService} from "../login-signup";
import {FormControl, FormGroup} from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  MService;


  constructor( ms : MediaServiceService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.MService = ms;
    this.toastr.setRootViewContainerRef(vcr);
  }

  loginForm = new FormGroup ({
    email: new FormControl(),
    password: new FormControl()
  });


  login () {
    if (this.loginForm.controls.email.value || this.loginForm.controls.password.value) {
    this.MService.logUserIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
  } else {
      this.toastr.error('Fill all the fields');
    }
  }
}
