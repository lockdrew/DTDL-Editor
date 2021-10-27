import { Component, Input, OnInit } from '@angular/core';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ICapabilityFormControl } from '../formControls/ICapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service'


@Component({
  selector: 'command-definition',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {
  @Input() public formIndex: number = 0;
  @Input() public command!: ICapabilityFormControl<ICapabilityModel>;
  @Input() public panelOpenState!: boolean;

  constructor(public editorService: EditorService) { 
    
  }

  public ngOnInit(): void {  
    this.command.subscribeModelToForm();
  }
}
