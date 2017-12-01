///<reference path="../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {MediaServiceService} from "../media-service.service";
import { User } from "../user";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  MService;


  constructor( ms : MediaServiceService) {
    this.MService = ms;
  }

  loginForm = new FormGroup ({
    email: new FormControl(),
    password: new FormControl()
  });


  login () {
    if (this.loginForm.controls.email.value || this.loginForm.controls.password.value) {
    this.MService.logUserIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
  } else {
    console.log('error')
    }
  }
}
