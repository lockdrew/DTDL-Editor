import { Component, Input, OnInit } from '@angular/core';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ICapabilityFormControl } from '../formControls/ICapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'property-definition',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @Input() public formIndex!: number;
  @Input() public property!: ICapabilityFormControl<ICapabilityModel>;
  @Input() public panelOpenState!: boolean;

  constructor(public editorService: EditorService) { 
    
  }

  public ngOnInit(): void { 
    this.property.subscribeModelToForm();
  }
}
