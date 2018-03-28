import { ICAFormItem } from "./i-ca-form-item.interface";
import {CAlertClass} from '@criollapp/common';
import { FormGroup, FormArray, FormControl } from "@angular/forms";
import { EventEmitter } from "@angular/core";

export interface ICAFormControl
{
  route:string;
  items:ICAFormItem[];
  model:any;
  parentModel:any;
  alerts: CAlertClass[];
  actionType: string;
  control: FormGroup | FormArray | FormControl;
  modelChange:EventEmitter<any>;

  submitText:string;
  alignTitleTo:string;
  titleControl:string;
  displayAlertOn:string[];
  displaySubmitOn:string[];

  addErrorAlert(errorKey: string, label:string):void;
  removeAlert( alertToDelete:CAlertClass ):void;
  addItem(item:ICAFormItem):void;
  displayAlertOnTop():boolean;
  displayAlertOnBottom():boolean;
  displaySubmitOnBottom():boolean;
  displaySubmitOnTop():boolean;
  itemsAreGroup():boolean;
  getFirstItem():ICAFormItem;
}
