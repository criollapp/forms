import { Component, ViewChild } from "@angular/core";
import { TestCAFormControlComponentAbstractUtil } from "./test-ca-form-control-abstract.util";
import { ICAFormControl } from "../../interfaces/i-ca-form-control.interface";
import { CAFormGroup } from "../../class/ca-form-group.class";

@Component({
  template:`
      <test-ca-form-control
      (caFormControlChange)="formControlChanged()"
      [caFormControl]="controlInstance"
      (submitClicked)="submitClicked()"></test-ca-form-control>
  `})
export class TestCAFormConrolContainerComponent
{
  @ViewChild(TestCAFormControlComponentAbstractUtil) public formControl: TestCAFormControlComponentAbstractUtil;

  public controlInstance:ICAFormControl;

  constructor()
  {
    this.controlInstance = new CAFormGroup();
    this.controlInstance.route = 'testRoute';
  }

  public submitClicked()
  {

  }

  public formControlChanged()
  {

  }
}
