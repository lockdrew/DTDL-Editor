import { Component, Inject, OnInit } from '@angular/core';
import  { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss']
})
export class ErrorSnackbarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private _snackBarRef: MatSnackBarRef<ErrorSnackbarComponent>) { 
    
  }

  ngOnInit(): void {
  }

  dismiss() {
    this._snackBarRef.dismiss();
  }
}

