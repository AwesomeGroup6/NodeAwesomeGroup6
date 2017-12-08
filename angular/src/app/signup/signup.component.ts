import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MediaServiceService} from "../login-signup";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  MService;

  constructor( ms : MediaServiceService, private toastr: ToastsManager, vcr: ViewContainerRef) {
    this.MService = ms;
    this.toastr.setRootViewContainerRef(vcr);
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
      this.MService.signUserUp(this.signupForm.controls.email.value, this.signupForm.controls.password.value, this.signupForm.controls.firstName.value, this.signupForm.controls.lastName.value, this.signupForm.controls.phoneNumber.value, this.signupForm.controls.dob.value, this.signupForm.controls.gender.value)

    } else {
      this.toastr.error('Fill all the fields');
    }
  }
}
