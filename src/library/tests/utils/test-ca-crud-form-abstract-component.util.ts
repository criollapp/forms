import {Component, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {CACrudFormAbstract} from '../../abstracts/ca-crud-form.abstract';
import {TestCrudService} from './test-ca-crud-service.util';
import { TestICALangServiceImplementation } from "./test-i-ca-lang-service-implementation.util";

@Component({template: ''})
export class CATestCrudFormAbstractComponent extends CACrudFormAbstract implements OnChanges {
  public onChange: EventEmitter<any> = new EventEmitter();

  constructor( protected _service: TestCrudService, translation: TestICALangServiceImplementation, formBuilder: FormBuilder )
  {
    super();

    this.formConfig.setLabels( TestICALangServiceImplementation.FAKE_VALUE );
    this._formBuilder = formBuilder;
  }

  public get formBuilder() {
    return this._formBuilder;
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      this.onChange.emit();
    }, 10);
  }

  submitFine() {
    this.executeAction();
  }

  submitBad()
  {
    this._service.fail = true;
    this.executeAction();
    this._service.fail = false;
  }
}
