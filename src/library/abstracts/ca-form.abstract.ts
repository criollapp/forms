import { FormBuilder } from '@angular/forms';
import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICAResponse, CAlertClass } from '@criollapp/common';
import { CAComponentAbstract} from '@criollapp/components';
import { ICAFormConfigService } from "../interfaces/i-ca-form-config-service.interface";
import { ICAForm } from "../interfaces/i-ca-form.interface";
import { CAFormItem } from "../class/ca-form-item.class";
import { CAFormGroup } from "../class/ca-form-group.class";
import { ICAFormControl } from "../interfaces/i-ca-form-control.interface";
import 'rxjs/add/operator/take';
import { CAFormConfig } from "../class/config/ca-form-config.class";
import { CAFormConfigItem } from "../class/config/ca-form-config-item.class";
import { CAFormConfigResponse } from "../class/config/ca-form-config.response";

export abstract class CAFormAbstract extends CAComponentAbstract implements OnInit, ICAForm {

  public static readonly STATUS_BUILDING = 'building';
  public static readonly STATUS_BUILD = 'build';
  public static readonly STATUS_BUILD_FAILED = 'build_failed';

  private _status: string;
  public attemptsBuild:number;
  private _formConfig:CAFormConfig;
  private _response:ICAResponse;

  protected _formBuilder: FormBuilder;

  @Input() public form: ICAFormControl;

  protected _CAFormConfigService: ICAFormConfigService;

  @Output() public beforeAction: EventEmitter<ICAResponse> = new EventEmitter();
  @Output() public action: EventEmitter<ICAResponse> = new EventEmitter();
  @Output() public successfulAction: EventEmitter<ICAResponse> = new EventEmitter();
  @Output() public failAction: EventEmitter<ICAResponse> = new EventEmitter();
  @Output() public endAction: EventEmitter<ICAResponse> = new EventEmitter();

  @Output() public statusChange: EventEmitter<string> = new EventEmitter();
  @Output() public modelChange: EventEmitter<ICAResponse> = new EventEmitter();
  @Output() public configServiceChange: EventEmitter<ICAFormConfigService> = new EventEmitter();
  @Output() public builded: EventEmitter<void> = new EventEmitter();
  @Output() public buildFailed: EventEmitter<void> = new EventEmitter();

  constructor() {
    super();

    this.form = this.getInitialFormGroupInstance();
    this.formConfig = new CAFormConfig();
    this.setStatus( CAFormAbstract.STATUS_BUILDING );
    this.attemptsBuild = 0;

    this.beforeAction.subscribe(() => {
      this.executeAction();
    });
    this.successfulAction.subscribe(() => {
      this.executeEndAction();
    });
    this.failAction.subscribe(() => {
      this.executeEndAction();
    });
  }

  ngOnInit() {
      this.buildForm();
  }

  protected getInitialFormGroupInstance():ICAFormControl
  {
    let group:ICAFormControl = new CAFormGroup();
    group.route = 'root';
    return group;
  }

  get alerts():CAlertClass[]
  {
    return this.form.alerts;
  }

  get status():string
  {
    return this._status;
  }

  protected setStatus(status:string)
  {
    if(status != this._status)
    {
      this._status = status;
      this.statusChange.emit(this._status);
    }
  }

  set formConfig(formConfig: CAFormConfig)
  {
    if(formConfig != this._formConfig)
    {
      this._formConfig = formConfig;
      this.form.items = [];

      let newItems:CAFormItem[] = [];
      formConfig.items.forEach((formItem:CAFormConfigItem)=>{
        let item:CAFormItem = new CAFormItem(formItem);
        newItems.push(item);
      });
      this.form.items = newItems;
      formConfig.labels('FORMS.SUBMIT_TEXT').subscribe((label:string)=>{
        this.form.submitText = label;
      });
    }
  }

  get formConfig()
  {
    return this._formConfig;
  }

  protected buildForm(): void
  {
    if(this._CAFormConfigService)
    {
      this._CAFormConfigService.getFormConfig().then((formConfig:CAFormConfigResponse)=> {
        this.formConfig = formConfig.data;
        this.setStatus( CAFormAbstract.STATUS_BUILD );
        this.builded.emit();
      }).catch(()=> {
        if( this.attemptsBuild < 10 ) {
          this.attemptsBuild++;
          this.buildForm();
        }
        else {
          this.setStatus( CAFormAbstract.STATUS_BUILD_FAILED );
          this.buildFailed.emit();
        }
      });
    }
  }

  @Input()
  public get model(): any {
    return this.getModel();
  }

  protected getModel() {
    return this.form.model;
  }

  public set model(newModel) {
    this.setModel(newModel);
  }

  protected setModel(newModel) {
    if (newModel !== this.form.model) {
      this.form.model = newModel;
      this.emitModelChanged();
    }
  }

  protected emitModelChanged()
  {
    this.modelChange.emit(this.form.model);
  }

  public submit() {
    this.executeBeforeAction();
  }

  protected executeBeforeAction() {
    this.emitBeforeAction();
  }

  protected emitBeforeAction() {
    this.beforeAction.emit(this.response);
  }

  protected executeAction() {
    this.formConfig.labels('FORMS.DEFAULT_FAIL').take(1).subscribe((label)=>{
      this.form.addErrorAlert('FORMS.DEFAULT_FAIL', label);
      this.executeFailAction();
    });
  }

  protected emitAction() {
    this.action.emit(this.response);
  }

  protected executeSuccessfulAction() {
    this.emitAction();
    this.emitSuccessfulAction();
  }

  protected emitSuccessfulAction() {
    this.successfulAction.emit(this.response);
  }

  protected executeFailAction() {
    this.emitAction();
    this.emitFailAction();
  }

  protected emitFailAction() {
    this.failAction.emit(this.response);
  }

  protected executeEndAction() {
    this.emitEndAction();
  }

  protected emitEndAction() {
    this.endAction.emit(this.response);
  }

  protected get response()
  {
    return this._response;
  }

  protected set response( response: ICAResponse )
  {
    this.form.model = response.data;
    this.emitModelChanged();
    this._response = response;
  }

  public setLang(name:string)
  {
    this._formConfig.lang = name;
  }

  @Input() public set displayAlertsOn( displays:string[] )
  {
    this.form.displayAlertOn = displays;
  }

  @Input() public set configService( config:ICAFormConfigService )
  {
    if( config != this._CAFormConfigService )
    {
      this._CAFormConfigService = config;
      this.configServiceChange.emit(this._CAFormConfigService);
      this.buildForm();
    }
  }

  public get configService()
  {
    return this._CAFormConfigService;
  }
}
