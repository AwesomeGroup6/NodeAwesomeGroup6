///<reference path="../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {MediaServiceService} from "../login-signup";
import {FormControl, FormGroup} from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  MService;
  
  
    constructor( ms : MediaServiceService, public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.MService = ms;
      this.toastr.setRootViewContainerRef(vcr);
    }

    authForm = new FormGroup ({
      key: new FormControl(),
    });

  ngOnInit() {
  }

  authenticate () {
    if (this.authForm.controls.key.value) {
    this.MService.authUser(this.authForm.controls.key.value);
  } else {
      this.toastr.error('Fill all the fields');
    }
  }

}
