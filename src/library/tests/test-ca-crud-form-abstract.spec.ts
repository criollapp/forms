import {CACrudFormAbstract} from '../abstracts/ca-crud-form.abstract';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CATestCrudFormAbstractComponent} from './utils/test-ca-crud-form-abstract-component.util';
import {TestCrudService} from './utils/test-ca-crud-service.util';
import { TestModel } from "./utils/ca-test-model";
import { CAFormsModule } from "../modules/ca-forms.module";
import { TestICALangServiceImplementation } from "./utils/test-i-ca-lang-service-implementation.util";

describe('CACrudFormAbstract', () => {
  let component: CATestCrudFormAbstractComponent;
  let fixture: ComponentFixture<CATestCrudFormAbstractComponent>;
  const model: TestModel = new TestModel();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CAFormsModule],
      declarations: [CATestCrudFormAbstractComponent],
      providers: [TestCrudService, TestICALangServiceImplementation]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CATestCrudFormAbstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('when model in db is set, actionType must be reading', () => {
    model.id = 1;
    component.model = model;

    expect(component.form.actionType === CACrudFormAbstract.ACTION_TYPE_READING).toBeTruthy();
  });

  it('when model no in db is set, actionType must be creating', () => {
    model.id = -1;
    component.model = model;

    expect(component.form.actionType === CACrudFormAbstract.ACTION_TYPE_CREATING).toBeTruthy();
  });

  it('when model is no on db and is saved, creationSuccessful and successfulAction must be emitted', () => {
    model.id = -1;
    component.model = model;
    let creationFine = false;
    let succcessFine = false;
    component.creationSuccessful.subscribe(() => {
      creationFine = true;
    });
    component.successfulAction.subscribe(() => {
      succcessFine = true;
    });

    component.submitFine();

    fixture.whenStable().then(() => {
      expect(creationFine).toBeTruthy();
      expect(succcessFine).toBeTruthy();
    });
  });

  it('when model is on db and is saved, updateSuccessful and successfulAction must be emitted', () => {
    model.id = 1;
    component.model = model;
    let updateFine = false;
    let succcessFine = false;
    component.updateSuccessful.subscribe(() => {
      updateFine = true;
    });
    component.successfulAction.subscribe(() => {
      succcessFine = true;
    });

    component.submitFine();

    fixture.whenStable().then(() => {
      expect(updateFine).toBeTruthy();
      expect(succcessFine).toBeTruthy();
    });
  });

  it('when model is no on db and saved is failed, failedSuccessful and creationFailed must be emitted', () => {
    model.id = -1;
    component.model = model;
    let creationFailed = false;
    let succcessFailed = false;
    component.creationFailed.subscribe(() => {
      creationFailed = true;
    });
    component.failAction.subscribe(() => {
      succcessFailed = true;
    });

    component.submitBad();

    fixture.whenStable().then(() => {
      setTimeout(()=>{
        expect(creationFailed).toBeTruthy();
        expect(succcessFailed).toBeTruthy();
      });
    });
  });

  it('when model is on db and saved is failed, failedSuccessful and updatedFailed must be emitted', () => {
    model.id = 1;
    component.model = model;
    let updateFailed = false;
    let succcessFailed = false;
    component.updateFailed.subscribe(() => {
      updateFailed = true;
    });
    component.failAction.subscribe(() => {
      succcessFailed = true;
    });

    component.submitBad();

    fixture.whenStable().then(() => {
      setTimeout(()=>{
        expect(updateFailed).toBeTruthy();
        expect(succcessFailed).toBeTruthy();
      });
    });
  });

});
