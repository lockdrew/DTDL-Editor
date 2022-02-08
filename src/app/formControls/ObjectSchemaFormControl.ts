import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FieldCapabilityModel } from '../models/FieldCapabilityModel';
import { ISchemaEditor } from '../models/ISchemaEditor';
import { ObjectSchemaCapbilityModel } from '../models/ObjectSchemaCapbilityModel';
import { ObjectSchemaComponent } from '../object-schema/object-schema.component';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { FieldCapabilityFormControl } from './FieldCapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class ObjectSchemaFormControl extends AbstractCapabilityFormControl<ObjectSchemaCapbilityModel> implements ISchemaEditor {
    private _validationService: ValidationService;
    public fields!: FieldCapabilityFormControl[];
    public dialog: MatDialog;

    constructor(model: ObjectSchemaCapbilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
        super(formBuilder);
        this._validationService = validationService;
        this.dialog = dialog;
        this.fields = new Array<FieldCapabilityFormControl>();
        this.mapModelSubProperties(model);
        this.model = model; 
        this.form = this.toFormGroup();          
    }

    private mapModelSubProperties(model: ObjectSchemaCapbilityModel): void {
        model.fields?.map((model: FieldCapabilityModel) => {
          let formControl: FieldCapabilityFormControl = new FieldCapabilityFormControl(model, this.formBuilder, this._validationService);    
          this.fields.push(formControl);
        });
      }

    public toFormGroup(): FormGroup { 
        let form =  this.formBuilder.group({
            id: [this.model.id, [this._validationService.ValidDtmi()]],
            displayName: [this.model.displayName], 
            comment: [this.model.comment],
            description: [this.model.description],
            // Object Schema Specific
            fields: this.formBuilder.array([...this.model.fields])
        });

        return form;
    }

    public openSchemaEditor(parentForm: FormGroup): void {
        var schema = parentForm.get("schema")?.value as ObjectSchemaCapbilityModel;

        this.dialog.open(ObjectSchemaComponent, { 
            data: schema
        })
        .afterClosed()
        .subscribe((result: ObjectSchemaCapbilityModel) => {
            if (result) {
                parentForm.get("schema")?.setValue(result);
            } 
        });
    }
}