import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MediaServiceService} from "../media-service.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  MService;

  constructor( ms : MediaServiceService) {
    this.MService = ms;
  }

  signupForm = new FormGroup ({
    email: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    phoneNumber: new FormControl(),
    dob: new FormControl(),
    gender: new FormControl()
  });


  signup () {
    if (this.signupForm.controls.email.value || this.signupForm.controls.password.value) {
      this.MService.logUserIn(this.signupForm.controls.email.value, this.signupForm.controls.password.value)
    } else {
      console.log('error')
    }
  }
}
