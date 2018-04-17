import { ICAFormControl } from "../interfaces/i-ca-form-control.interface";
import { ICAFormItem } from "../interfaces/i-ca-form-item.interface";
import {CAlertClass} from '@criollapp/common';
import { FormControl, FormArray, FormGroup } from "@angular/forms";
import { EventEmitter } from "@angular/core";
import { CAFormItemAbstract } from "./ca-form-item.abstract";

export abstract class CAFormControlAbstract implements ICAFormControl
{
  public static readonly DISPLAY_ALERTS_ON_BOTTOM_FORM:string = 'bottom';
  public static readonly DISPLAY_ALERTS_ON_TOP_FORM:string = 'top';
  public static readonly DISPLAY_SUBMIT_ON_BOTTOM:string = 'bottom';
  public static readonly DISPLAY_SUBMIT_ON_TOP:string = 'top';

  public static readonly ALIGN_TO_LEFT:string = 'left';
  public static readonly ALIGN_TO_RIGHT:string = 'right';
  public static readonly ALIGN_TO_CENTER:string = 'center';

  public route:string;
  private _items:ICAFormItem[];
  public alerts: CAlertClass[];
  public actionType: string;
  protected _model:any;
  private indexOfSingleTip:number;
  public parentModel:any;
  public control: FormGroup | FormArray | FormControl;

  public submitText:string;
  public titleControl:string;
  public displayAlertOn:string[];
  public displaySubmitOn:string[];
  public alignTitleTo:string;

  public modelChange:EventEmitter<any> = new EventEmitter();

  constructor()
  {
    this.items = [];
    this.indexOfSingleTip = 0;
    this.alerts = [];
    this.route = '';
    this.submitText = '';
    this.titleControl = '';
    this.displayAlertOn = [CAFormControlAbstract.DISPLAY_ALERTS_ON_BOTTOM_FORM];
    this.displaySubmitOn = [CAFormControlAbstract.DISPLAY_SUBMIT_ON_BOTTOM];
    this.alignTitleTo = CAFormControlAbstract.ALIGN_TO_LEFT;
  }

  public get singleTip():CAlertClass
  {
    return this.alerts.length > 0 ? this.alerts[this.indexOfSingleTip] : null;
  }

  public get model():any
  {
    return this._model;
  }

  public set model(newModel:any)
  {
    if(newModel != this._model)
    {
      this._model = newModel;
      this.updateChildModel();
      this.modelChange.emit(this.model);
    }
  }

  public displayAlertOnTop():boolean
  {
    return this.displayAlertOn.indexOf( CAFormControlAbstract.DISPLAY_ALERTS_ON_TOP_FORM ) > -1;
  }

  public displayAlertOnBottom():boolean
  {
    return this.displayAlertOn.indexOf( CAFormControlAbstract.DISPLAY_ALERTS_ON_BOTTOM_FORM ) > -1;
  }

  public displaySubmitOnBottom():boolean
  {
    return this.displaySubmitOn.indexOf( CAFormControlAbstract.DISPLAY_SUBMIT_ON_BOTTOM ) > -1;
  }

  public itemsAreGroup():boolean
  {
    return this.items.filter( item => item.isGroup() ).length > 0;
  }

  public getFirstItem():ICAFormItem
  {
    return this.items[0];
  }

  public displaySubmitOnTop():boolean
  {
    return this.displaySubmitOn.indexOf( CAFormControlAbstract.DISPLAY_SUBMIT_ON_TOP ) > -1;
  }

  updateChildModel():void
  {
  }

  public get items():ICAFormItem[]
  {
    return this._items;
  }

  public set items(items:ICAFormItem[])
  {
    this.buildFormControlFromItems(items);
    this._items = items;
  }

  public addErrorAlert(errorKey: string, label)
  {
    if(!CAlertClass.alertExists(this.alerts, errorKey))
    {
      this.alerts.push( new CAlertClass( label, CAlertClass.TYPE_DANGER, errorKey, true ) );
    }
  }

  public removeAlert( alertToDelete:CAlertClass )
  {
    this.alerts.forEach((alert,index)=>{
      if( alert.key == alertToDelete.key )
      {
        this.alerts.splice(index, 1);
      }
    });
  }

  protected abstract buildFormControlFromItems(items:ICAFormItem[]);

  public abstract addItem(item:ICAFormItem):void;
}
