import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InterfaceCapabilityModel } from '../models/InterfaceCapabilityModel';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';
import { FileService } from '../services/file/file-service.service';
import { ValidationService } from '../services/validation/validation-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'file-select',
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.scss']
})
export class FolderSelectComponent implements OnInit {
  @ViewChild("fileInput") fileInput!: ElementRef;  
  public editorService: EditorService;
  public fileService: FileService;
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  public dialogRef: MatDialogRef<FolderSelectComponent>;

  constructor(editorService: EditorService, fileService: FileService, formBuilder: FormBuilder, validationService: ValidationService, dialogRef: MatDialogRef<FolderSelectComponent>) {
    this.editorService = editorService;
    this._validationService = validationService;
    this.fileService = fileService;
    this._formBuilder = formBuilder;
    this.dialogRef = dialogRef;
  }

  ngOnInit(): void {  }

  uploadFiles(file: any) {
    this.dialogRef.close();
    
    this.fileService.uploadFiles(file).subscribe((capability: InterfaceCapabilityModel) => { 
      console.log("Loaded file '%s'.", capability.displayName);
      var formControl = new InterfaceCapabilityFormControl(capability, this._formBuilder, this._validationService);
      this.editorService.addInterface(formControl);
    });
    this.fileInput.nativeElement.value = "";
  }
}
