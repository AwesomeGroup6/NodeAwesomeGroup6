import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html'
})
export class QrcodeComponent {
  constructor(
    public dialogRef: MatDialogRef<QrcodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}
localStorage.getItem('uri');