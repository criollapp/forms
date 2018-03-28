import { Component, ViewChild } from "@angular/core";
import { CATestFormAbstractComponent } from "./test-ca-form-abstract-component.util";
import { TestICAFormConfigServiceImplementation } from "./test-i-ca-form-config-service-implementation.util";

@Component({
  template:`
    <test-ca-form
      (beforeAction)="beforeAction()"
      (action)="action()"
      (successfulAction)="successfulAction()"
      (failAction)="failAction()"
      (endAction)="endAction()"
      (statusChange)="statusChange()"
      (modelChange)="modelChange()"
      [(configService)]="configService"
      (configServiceChange)="configServiceCalled()"
      (builded)="builded()"
      (buildFailed)="buildFailed()"
      [displayAlertsOn]="displayAlertsOn"></test-ca-form>
  `})
export class TestcaFormContainerComponent
{
  @ViewChild(CATestFormAbstractComponent) public form: CATestFormAbstractComponent;

  public displayAlertsOn:string[];

  constructor( public configService:TestICAFormConfigServiceImplementation )
  {
    this.displayAlertsOn = [];
  }

  configServiceCalled(){}

  modelChange(){}

  statusChange(){}

  builded(){}

  buildFailed(){}

  endAction(){}

  failAction(){}

  successfulAction(){}

  beforeAction(){}

  action(){}
}
