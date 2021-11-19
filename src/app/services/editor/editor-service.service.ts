import { Injectable } from '@angular/core';
import { InterfaceCapabilityFormControl } from 'src/app/formControls/InterfaceCapabilityFormControl';
import { FormArray, FormBuilder } from '@angular/forms';
import { CommandCapabilityFormControl } from 'src/app/formControls/CommandCapabilityFormControl';
import { PropertyCapabilityFormControl } from 'src/app/formControls/PropertyCapabilityFormControl';
import { TelemetryCapabilityFormControl } from 'src/app/formControls/TelemetryCapabilityFormControl';
import { ICapabilityFormControl } from 'src/app/formControls/ICapabilityFormControl';
import { RelationshipCapabilityFormControl } from 'src/app/formControls/RelationshipCapabilityFormControl';
import { ComponentCapabilityFormControl } from 'src/app/formControls/ComponentCapabilityFormControl';
import { ICapabilityModel } from 'src/app/models/ICapabilityModel';
import { Subject } from 'rxjs';
import { RelationshipCapabilityModel } from 'src/app/models/RelationshipCapabilityModel';
import { PropertyCapabilityModel } from 'src/app/models/PropertyCapabilityModel';
import { CommandCapabilityModel } from 'src/app/models/CommandCapabilityModel';
import { ComponentCapabilityModel } from 'src/app/models/ComponentCapabilityModel';
import { TelemetryCapabilityModel } from 'src/app/models/TelemetryCapabilityModel';
import { ValidationService } from '../validation/validation-service.service';
import { SettingsService } from '../settings/settings.service';
import { EditorSettings } from 'src/app/models/EditorSettings';

@Injectable({
  providedIn: 'root'
})

export class EditorService {
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  public classTypes: string[];
  public capabilities: string[];
  public semantics: string[];
  public schemaTypes: string[];
  public complexShcemaTypes: string[];  
  public commandTypes: string[];
  public interfaces: InterfaceCapabilityFormControl[];
  public interfaces$: Subject<InterfaceCapabilityFormControl>;  
  private _editorSettings: EditorSettings;
  
  constructor(validationService: ValidationService, formBuilder: FormBuilder, settingsService: SettingsService) { 
    this._validationService = validationService;
    this._formBuilder = formBuilder;
    this.classTypes = this.getClassTypes();
    this.capabilities = this.getCapabilityTypes();
    this.semantics= this.getSemanticTypes();
    this.schemaTypes = this.getSchemaTypes();
    this.complexShcemaTypes = this.getComplexSchemaTypes();    
    this.commandTypes = this.getCommandTypes();
    this.interfaces = new Array<InterfaceCapabilityFormControl>();
    this.interfaces$ = new Subject<InterfaceCapabilityFormControl>();  
    this._editorSettings = settingsService.load();  
  }

  public getClassTypes() : string[] {
    return ["Interface", "Telemetry", "Property", "Command", "Relationship", "Component"];
  }

  public getCapabilityTypes() : string[] {
    return ["Property", "Command", "Telemetry"];
  }

  public getSemanticTypes() : string[] {
    return ["Acceleration", "Angle", "AngularAcceleration", "AngularVelocity", "Area", "Capacitance", "Current", "DataRate", "DataSize", "Density", "Distance", "ElectricCharge", "Energy", "Force", "Frequency", "Humidity", "Illuminance", "Inductance", "Latitude", "Longitude", "Length", "Luminance", "Luminosity", "LuminousFlux", "LuminousIntensity", "MagneticFlux", "MagneticInduction", "Mass", "MassFlowRate", "Power", "Pressure", "RelativeHumidity", "Resistance", "SoundPressure", "Temperature", "Thrust", "TimeSpan", "Torque", "Velocity", "Voltage", "Volume", "VolumeFlowRate"];
  }

  public getSchemaTypes() : string[] {
    return ["boolean", "date", "dateTime", "double", "duration", "float", "integer", "long", "string", "time"];
  }

  public getComplexSchemaTypes() : string[] {
    return ["Array", "Enum", "Map", "Object"];
  }

  public getCommandTypes() : string[] {
    return ["synchronous", "asynchronous"];
  }

  public addInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    this.interfaces.push(interfaceInstance);
    this.interfaces$.next(interfaceInstance);
  }

  public addPropertyToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let model = new PropertyCapabilityModel(this._editorSettings.BaseDtmi);
    let formControl = new PropertyCapabilityFormControl(model, this._validationService, this._formBuilder);
    this.pushInterfaceContents(interfaceInstance, formControl);
  }

  public addCommandToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let model = new CommandCapabilityModel(this._editorSettings.BaseDtmi);   
    let formControl = new CommandCapabilityFormControl(model, this._validationService, this._formBuilder);
    this.pushInterfaceContents(interfaceInstance, formControl);
  }

  public addTelemetryToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let model = new TelemetryCapabilityModel(this._editorSettings.BaseDtmi);
    let formControl = new TelemetryCapabilityFormControl(model, this._validationService, this._formBuilder);
    this.pushInterfaceContents(interfaceInstance, formControl);
  }

  public addComponentToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let model = new ComponentCapabilityModel(this._editorSettings.BaseDtmi);
    let formControl = new ComponentCapabilityFormControl(model, this._validationService, this._formBuilder);
    this.pushInterfaceContents(interfaceInstance, formControl);
  }

  public addRelationshipToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let model = new RelationshipCapabilityModel(this._editorSettings.BaseDtmi);
    let formControl = new RelationshipCapabilityFormControl(model, this._validationService, this._formBuilder);
    this.pushInterfaceContents(interfaceInstance, formControl);
  }

  private pushInterfaceContents(interfaceInstance: InterfaceCapabilityFormControl, formControl: ICapabilityFormControl<ICapabilityModel>): void {    
    let contentsFormArray = interfaceInstance.form.get("contents") as FormArray;
    contentsFormArray.push(formControl.form);
    interfaceInstance.contents.push(formControl);    
    interfaceInstance.model.contents.push(formControl.model);
    this.interfaces$.next(interfaceInstance);

    console.groupCollapsed("Interface Form Capabilities");

    console.log("FormArray: %i, Contents: %i, Properties: %i, Commands: %i, Telemetry: %i, Components: %i, Relationships: %i",
      contentsFormArray.length, interfaceInstance.contents.length, interfaceInstance.properties.length,
      interfaceInstance.commands.length, interfaceInstance.telemetries.length, 
      interfaceInstance.components.length, interfaceInstance.relationships.length
    );
    
    console.groupEnd();

    console.groupCollapsed("Interface Model Capabilities");

    console.log("Contents: %i, Properties: %i, Commands: %i, Telemetry: %i, Components: %i, Relationships: %i",
      interfaceInstance.model.contents.length, interfaceInstance.model.properties.length,
      interfaceInstance.model.commands.length, interfaceInstance.model.telemetries.length, 
      interfaceInstance.model.components.length, interfaceInstance.model.relationships.length
    );

    console.groupEnd();
  }

  public addPropertyToRelationship(relationshipInstance: RelationshipCapabilityFormControl): void {
    let model = new PropertyCapabilityModel("New Property");
    let capability = new PropertyCapabilityFormControl(model,  this._validationService, this._formBuilder);
    this.pushRelationshipProperties(relationshipInstance, capability);
  }

  private pushRelationshipProperties(relationshipInstance: RelationshipCapabilityFormControl, formControl: ICapabilityFormControl<ICapabilityModel>): void {
    let formArray = relationshipInstance.form.get("properties") as FormArray;
    relationshipInstance.properties.push(formControl);
    formArray.push(formControl.form);
    relationshipInstance.model.properties.push(formControl.model);

    console.groupCollapsed("Relationship Form Capabilities");
    console.log("FormArray: %i, Properties: %i", formArray.length, relationshipInstance.properties.length);
    console.groupEnd();

    console.groupCollapsed("Relationship Model Capabilities");
    console.log("Properties: %i", relationshipInstance.model.properties.length);
    console.groupEnd();
  }

  public filterInterfacesForExtends(id: string): string[] {
    return this.interfaces.filter(x => x.model.id != id).map(x => x.model.id);
  }

  public deleteCapabilityFromInterface(interfaceInstance: InterfaceCapabilityFormControl, formIndex: [number, number]): void {
    if(formIndex[0] < 0 || formIndex[1] < 0) return;
    let contentsFormArray = interfaceInstance.form.get("contents") as FormArray;
    contentsFormArray.removeAt(formIndex[1]);
    interfaceInstance.contents.splice(formIndex[1], 1);
    interfaceInstance.model.contents.splice(formIndex[1], 1);
    this.interfaces$.next(interfaceInstance);
  }
}