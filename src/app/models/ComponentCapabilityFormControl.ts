import 'reflect-metadata';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ComponentCapabilityDto } from './ComponentCapabilityDto';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

export class ComponentCapabilityFormControl extends AbstractCapabilityFormControl<ComponentCapabilityDto>  {
  constructor(formBuilder: FormBuilder) {  
    super(formBuilder);
    this.capability = new ComponentCapabilityDto();
  }
  
  public toFormGroup(): FormGroup {
    this.form = this.formBuilder.group({
      index: [this.index],
      id: [this.capability.id],
      type: [this.capability.type],
      displayName: [this.capability.displayName],
      name: [this.capability.name],
      comment: [this.capability.comment],
      description: [this.capability.description],
      // Component specific
      schema: [this.capability.schema]
    });

    return this.form;
  }

  public getValue(): ComponentCapabilityDto {
    return this.capability;
  }
}
