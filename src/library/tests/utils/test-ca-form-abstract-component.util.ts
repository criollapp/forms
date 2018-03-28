import {Component, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

import {CAFormAbstract} from '../../abstracts/ca-form.abstract';
import { TestICAFormConfigServiceImplementation } from "./test-i-ca-form-config-service-implementation.util";
import { TestICALangServiceImplementation } from "./test-i-ca-lang-service-implementation.util";

@Component({selector: 'test-ca-form', template: ''})
export class CATestFormAbstractComponent extends CAFormAbstract implements OnChanges {
  public onChange: EventEmitter<any> = new EventEmitter();
  public buildFormCalled = false;

  constructor() {
    super();

    this.formConfig.setLabels( TestICALangServiceImplementation.FAKE_VALUE );
  }

  public getForm()
  {
    return this.form;
  }

  public fail(): void {
    ( this.configService as TestICAFormConfigServiceImplementation ).fail = true;

    super.buildForm();
  }

  public buildForm(): void {
    super.buildForm();
    this.buildFormCalled = true;
  }

  public get formBuilder() {
    return this._formBuilder;
  }

  public executeSuccessfulAction()
  {
    super.executeSuccessfulAction();
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      this.onChange.emit();
    }, 10);
  }

  setStatusBuildingFailed()
  {
    this.setStatus(CAFormAbstract.STATUS_BUILD_FAILED);
  }

  public getAttemptsBuild()
  {
    return this.attemptsBuild;
  }
}
