import {Component, Inject, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthGateService} from "../auth-gate.service";
import {ToastsManager} from "ng2-toastr";


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html'
})
export class QrcodeComponent {
  private agS;
  constructor(agService: AuthGateService, public toastr: ToastsManager, vcr: ViewContainerRef,
    public dialogRef: MatDialogRef<QrcodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { this.agS = agService; this.toastr.setRootViewContainerRef(vcr);}

    authConfForm = new FormGroup ({
      key: new FormControl(),
    });

    authenticateConfirm () {
      if (this.authConfForm.controls.key.value) {
      this.agS.authConfirmUser(this.authConfForm.controls.key.value);
    } else {
        this.toastr.error('Fill all the fields');
      }
    }
}

