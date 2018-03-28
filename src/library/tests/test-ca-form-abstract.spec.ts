import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CATestFormAbstractComponent} from './utils/test-ca-form-abstract-component.util';
import { TestcaFormContainerComponent } from "./utils/test--ca-form-abstract-container-component.util";
import { TestICAFormConfigServiceImplementation } from "./utils/test-i-ca-form-config-service-implementation.util";
import { CAFormItemAbstract } from "../abstracts/ca-form-item.abstract";
import { CAFormGroup } from "../class/ca-form-group.class";
import { CAFormItem } from "../class/ca-form-item.class";
import { CAFormControl } from "../class/ca-form-control.class";
import { CAFormControlAbstract } from "../abstracts/ca-form-control.abstract";
import { CArrayUtil, CAGeneratorUtil, CAlertClass } from "@criollapp/common";
import { TestModel } from "./utils/ca-test-model";
import { CAFormConfig } from "../class/config/ca-form-config.class";
import { CAFormConfigItem } from "../class/config/ca-form-config-item.class";
import { TestICALangServiceImplementation } from "./utils/test-i-ca-lang-service-implementation.util";
import { CAFormsModule } from "../modules/ca-forms.module";
import { CAFormAbstract } from "../abstracts/ca-form.abstract";
import { CAFormConfigResponse } from "../class/config/ca-form-config.response";

describe('caFormAbstract', () => {
  let component: CATestFormAbstractComponent;
  let fixture: ComponentFixture<CATestFormAbstractComponent>;
  let containerComponent: TestcaFormContainerComponent;
  let containerFixture: ComponentFixture<TestcaFormContainerComponent>;
  const model: TestModel = new TestModel();
  let service:TestICAFormConfigServiceImplementation = new TestICAFormConfigServiceImplementation();
  let config:CAFormConfig = new CAFormConfig();
  config.lang = 'es';
  config.setLabels( { 'es': {'FORMS.DEFAULT_FAIL': 'Este formulario no tiene una accion implementada'} } );
  let configItem:CAFormConfigItem = new CAFormConfigItem();
  let formItem:CAFormItem = new CAFormItem();
  formItem.key = 'example';
  formItem.setFormControlType();
  formItem.xControl = new CAFormControl();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CAFormsModule],
      declarations: [CATestFormAbstractComponent, TestcaFormContainerComponent],
      providers: [TestICALangServiceImplementation, TestICAFormConfigServiceImplementation]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CATestFormAbstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.setLang('es');

    containerFixture = TestBed.createComponent(TestcaFormContainerComponent);
    containerComponent = containerFixture.componentInstance;
    containerFixture.detectChanges();
    configItem.name = 'username';
    configItem.type = CAFormItemAbstract.TYPE_FORM_CONTROL;
  });

  it('when is submited, beforeAction Event y executed by default', () => {
    let eventExecuted: Boolean = false;
    component.beforeAction.subscribe(() => {
      eventExecuted = true;
    });
    component.submit();
    expect(eventExecuted).toBeTruthy();
  });

  it('when beforeAction Event is emmited, the object emmited must be XModelResponse', () => {
    let responseEmmited;
    component.beforeAction.subscribe((response) => {
      responseEmmited = response;
    });
    component.submit();
    expect(responseEmmited == null).toBeTruthy();
  });

  it('when is submited, action Event y executed by default', () => {
    let eventExecuted: Boolean = false;
    component.action.subscribe(() => {
      eventExecuted = true;
    });
    component.submit();
    expect(eventExecuted).toBeTruthy();
  });

  it('when action Event is emmited, the object emmited must be XModelResponse', () => {
    let responseEmmited;
    component.action.subscribe((response) => {
      responseEmmited = response;
    });
    component.submit();
    expect(responseEmmited == null).toBeTruthy();
  });

  it('when is submited, failAction Event y executed by default', () => {
    let eventExecuted: Boolean = false;
    component.failAction.subscribe(() => {
      eventExecuted = true;
    });
    component.submit();
    expect(eventExecuted).toBeTruthy();
  });

  it('when failAction Event is emmited, the object emmited must be XModelResponse', () => {
    let responseEmmited;
    component.failAction.subscribe((response) => {
      responseEmmited = response;
    });
    component.submit();
    expect(responseEmmited == null).toBeTruthy();
  });

  it('when is submited, endAction Event y executed by default', () => {
    let eventExecuted: Boolean = false;
    component.endAction.subscribe(() => {
      eventExecuted = true;
    });
    component.submit();
    expect(eventExecuted).toBeTruthy();
  });

  it('when endAction Event is emmited, the object emmited must be XModelResponse', () => {
    let responseEmmited;
    component.endAction.subscribe((response) => {
      responseEmmited = response;
    });
    component.submit();
    expect(responseEmmited == null).toBeTruthy();
  });

  it('when is submited, successfulAction Event is not executed by default', () => {
    let eventExecuted: Boolean = false;
    component.successfulAction.subscribe(() => {
      eventExecuted = true;
    });
    component.submit();
    expect(eventExecuted).toBeFalsy();
  });

  it('when is successfulAction is executed, action event too', () => {
    let eventExecuted: Boolean = false;
    component.action.subscribe(() => {
      eventExecuted = true;
    });
    component.executeSuccessfulAction();
    expect(eventExecuted).toBeTruthy();
  });

  it('when is failedAction is executed, action event too', () => {
    let eventExecuted: Boolean = false;
    component.failAction.subscribe(() => {
      eventExecuted = true;
    });
    component.submit();
    expect(eventExecuted).toBeTruthy();
  });

  it('when failed, alert error is added with default message', () => {
    component.formConfig = config;

    component.action.subscribe(() => {
      expect(CAlertClass.alertExists(component.form.alerts, 'Este formulario no tiene una accion implementada')).toBeTruthy();
    });

    component.submit();
  });

  it('has alerts getter', () => {
    component.formConfig = config;

    component.submit();

    expect( component.alerts[0] instanceof CAlertClass ).toBeTruthy();
  });

  it('allowClose is true by default', () => {
    component.formConfig = config;

    component.submit();

    expect( component.form.alerts[0].allowClose ).toBeTruthy();
  });

  it('when model is set, model must be in form', () => {
    component.model = model;

    expect(component.model === model).toBeTruthy();
  });

  it('when model is changed, modelChange is emitted with model', () => {
    component.modelChange.subscribe((modelInForm) => {
      expect(model === modelInForm).toBeTruthy();
    });

    component.model = model;
  });

  it('when model is not changed, modelChange is not emitted', () => {
    component.model = model;
    component.modelChange.subscribe(() => {
      expect(false).toBeTruthy();
    });

    component.model = model;
  });

  it('when is instanced, buildForm should be called', () => {
    spyOn(component, 'buildForm');

    component.configService = new TestICAFormConfigServiceImplementation();

    fixture.whenStable().then(() => {
      expect(component.buildForm).toHaveBeenCalled();
    });
  });

  it('when status change, event must be emmited', () => {
    component.statusChange.subscribe((status:string)=>{
      expect(status == CAFormAbstract.STATUS_BUILD_FAILED ).toBeTruthy();
    });
    component.setStatusBuildingFailed();
  });

  it('beforeAction has Output decorator', () => {
    spyOn(containerComponent, 'beforeAction');

    containerComponent.form.submit();

    fixture.whenStable().then(() => {
      expect(containerComponent.beforeAction).toHaveBeenCalled();
    });
  });

  it('action has Output decorator', () => {
    spyOn(containerComponent, 'action');

    containerComponent.form.submit();

    fixture.whenStable().then(() => {
      expect(containerComponent.action).toHaveBeenCalled();
    });
  });

  it('successfulAction has Output decorator', () => {
    spyOn(containerComponent, 'successfulAction');

    containerComponent.form.executeSuccessfulAction();

    fixture.whenStable().then(() => {
      expect(containerComponent.successfulAction).toHaveBeenCalled();
    });
  });

  it('failAction has Output decorator', () => {
    spyOn(containerComponent, 'failAction');

    containerComponent.form.submit();

    fixture.whenStable().then(() => {
      expect(containerComponent.failAction).toHaveBeenCalled();
    });
  });

  it('endAction has Output decorator', () => {
    spyOn(containerComponent, 'endAction');

    containerComponent.form.submit();

    fixture.whenStable().then(() => {
      expect(containerComponent.endAction).toHaveBeenCalled();
    });
  });

  it('statusChange has Output decorator', () => {
    spyOn(containerComponent, 'statusChange');

    containerComponent.form.setStatusBuildingFailed();

    fixture.whenStable().then(() => {
      expect(containerComponent.statusChange).toHaveBeenCalled();
    });
  });

  it('builded has Output decorator', () => {
    spyOn(containerComponent, 'builded');

    containerComponent.form.buildForm();

    fixture.whenStable().then(() => {
      expect(containerComponent.builded).toHaveBeenCalled();
    });
  });

  it('buildFailed has Output decorator', () => {
    spyOn(containerComponent, 'buildFailed');

    containerComponent.form.buildForm();

    fixture.whenStable().then(() => {
      expect(containerComponent.buildFailed).toHaveBeenCalled();
    });
  });

  it('modelChange has Output decorator', () => {
    spyOn(containerComponent, 'modelChange');

    containerComponent.form.model = new TestModel({example1: 'what'});

    fixture.whenStable().then(() => {
      expect(containerComponent.modelChange).toHaveBeenCalled();
    });
  });

  it('get status must return current form status', () => {
    component.setStatusBuildingFailed();
    expect(component.status == CAFormAbstract.STATUS_BUILD_FAILED ).toBeTruthy();
  });

  it('set configService must set config when is different', () => {
    component.configService = new TestICAFormConfigServiceImplementation();

    expect(component.configService instanceof TestICAFormConfigServiceImplementation ).toBeTruthy();
  });

  it('get configService must return configService', () => {
    component.configService = new TestICAFormConfigServiceImplementation();

    expect(component.configService instanceof TestICAFormConfigServiceImplementation ).toBeTruthy();
  });

  it('set configService not must set config when is the same', () => {
    component.configService = null;

    expect(component.configService == null ).toBeTruthy();
  });

  it('configServiceChange has Output decorator', () => {
    spyOn(containerComponent, 'configServiceCalled');

    containerComponent.form.configService = new TestICAFormConfigServiceImplementation();

    fixture.whenStable().then(() => {
      expect(containerComponent.configServiceCalled).toHaveBeenCalled();
    });
  });

  it('configService change out when is binded', () => {
    config.key = CAGeneratorUtil.getFakeId().toString();
    service.formConfig = config;

    containerComponent.form.configService = service;

    expect(containerComponent.configService.formConfig.key == service.formConfig.key).toBeTruthy();
  });

  it('configService change in when is binded', () => {
    config.key = CAGeneratorUtil.getFakeId().toString();
    service.formConfig = config;

    containerComponent.configService = service;

    containerFixture.detectChanges();
    containerComponent.form.configService.getFormConfig().then((formConfig:CAFormConfigResponse )=>{
      expect(formConfig.data.key == service.formConfig.key).toBeTruthy();
    });
  });

  it('configService on component change form must be build', () => {
    component.buildFormCalled = false;
    component.configService = new TestICAFormConfigServiceImplementation();

    expect(component.buildFormCalled).toBeTruthy();
  });

  it('status must be building by default', () => {
    expect(component.status).toBe(CAFormAbstract.STATUS_BUILDING);
  });

  it('status must be build when form  is build', () => {
    component.configService = new TestICAFormConfigServiceImplementation();

    component.builded.subscribe(()=>{
      expect(component.status).toBe(CAFormAbstract.STATUS_BUILD);
    });

    component.buildForm();
  });

  it('status must be build failed when form build fail', () => {
    component.configService = new TestICAFormConfigServiceImplementation();

    component.buildFailed.subscribe(()=>{
      expect(component.status).toBe(CAFormAbstract.STATUS_BUILD_FAILED);
    });

    component.fail();
  });

  it('AttemptsBuild must be 10 when form  build fail', () => {
    component.configService = new TestICAFormConfigServiceImplementation();

    component.buildFailed.subscribe(()=>{
      expect(component.getAttemptsBuild()).toBe(10);
    });

    component.fail();
  });

  it('has items attr with default value', ()=>{
    expect( CArrayUtil.areEqual( component.form.items, [] ) ).toBeTruthy();
  });

  it('configService change without items, items in form must be reset', () => {
    service.formConfig = config;
    component.builded.subscribe(()=>{
      expect(component.form.items.length == 0 ).toBeTruthy();
    });

    component.configService = service;
  });

  it('configService change with items, items in form must be update', () => {
    config.items.push(configItem);
    service.formConfig = config;

    component.builded.subscribe(()=>{
      expect( component.form.items[0].type == configItem.type ).toBeTruthy();
      expect( component.form.items[0].key == configItem.name ).toBeTruthy();
      expect( CArrayUtil.areEqual( component.form.items[0].objectClass, configItem.objectClass ) ).toBeTruthy();
    });

    component.configService = service;
  });

  it('formConfig change with items, items in form must be update', () => {
    config.items.push(configItem);

    component.formConfig = config;

    expect( component.form.items[0].type == configItem.type ).toBeTruthy();
    expect( component.form.items[0].key == configItem.name ).toBeTruthy();
    expect( CArrayUtil.areEqual( component.form.items[0].objectClass, configItem.objectClass ) ).toBeTruthy();
  });

  it('type of form is CAFormGroup',()=>{
    expect( component.getForm() instanceof CAFormGroup ).toBeTruthy();
  });

  it('get and set items works',()=>{
    component.form.items = [ formItem ];

    expect( component.form.items[0].key == 'example' ).toBeTruthy();
  });

  it('set when one exists items must equal to new array',()=>{
    component.form.items = [ formItem ];
    formItem.key = 'example2';
    component.form.items = [ formItem ];

    expect( component.form.items[0].key == 'example2' ).toBeTruthy();
    expect( component.form.items.length == 1 ).toBeTruthy();
  });

  it('caFormGrup has root route by default',()=>{
    expect( component.form.route == 'root' ).toBeTruthy();
  });

  it('caFormGrup has submitText by default',()=>{
    expect( component.form.submitText == 'Send' ).toBeTruthy();
  });

  it('displayAlertsOn has @Input decorator', ()=>{
    containerComponent.displayAlertsOn = [ CAFormControlAbstract.DISPLAY_ALERTS_ON_BOTTOM_FORM ];

    containerFixture.whenStable().then(()=>{
      expect( CArrayUtil.areEqual( containerComponent.form.form.displayAlertOn, [ CAFormControlAbstract.DISPLAY_ALERTS_ON_BOTTOM_FORM ] ) ).toBeTruthy();
    });
  });

});
