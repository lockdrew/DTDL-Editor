import { FormBuilder, FormGroup } from "@angular/forms";
import { PropertyCapabilityModel } from '../models/PropertyCapabilityModel';
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

export class PropertyCapabilityFormControl extends AbstractCapabilityFormControl<PropertyCapabilityModel> {
  private _validationService: ValidationService;
  
  constructor(model: PropertyCapabilityModel, validationService: ValidationService, formBuilder: FormBuilder) {  
    super(formBuilder);
    this._validationService = validationService;
    this.model = model;
    this.form = this.toFormGroup();
  }
  
  public toFormGroup(): FormGroup {
    let form = this.formBuilder.group({
      id: [this.model.id, [this._validationService.ValidDtmi()]],
      type: [this.model.type],
      displayName: [this.model.displayName],
      name: [this.model.name],
      comment: [this.model.comment],
      description: [this.model.description],
      // Property specific
      schema: [this.model.schema],
      semanticType: [this.model.semanticType],
      writable: [this.model.writable]
    });

    return form;
  }
}
