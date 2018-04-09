import { ICAFormItem } from "../interfaces/i-ca-form-item.interface";
import { CAFormItem } from "../class/ca-form-item.class";
import { CAFormControl } from "../class/ca-form-control.class";
import { FormControl, FormGroup } from "@angular/forms";
import { CAFormGroup } from "../class/ca-form-group.class";
import { ICAFormControl } from "../interfaces/i-ca-form-control.interface";
import { CAFormArray } from "../class/ca-form-array.class";
import { CAFormConfigItem } from "../class/config/ca-form-config-item.class";

export abstract class CAFormItemAbstract implements ICAFormItem
{
  public static readonly TYPE_FORM_CONTROL:string = 'form_control';
  public static readonly TYPE_FORM_GROUP:string = 'form_group';
  public static readonly TYPE_FORM_ARRAY:string = 'form_array';

  public static readonly SUB_TYPE_INPUT_TEXT:string = 'text';
  public static readonly SUB_TYPE_INPUT_PASSWORD:string = 'password';

  public type:string;
  public subType:string;
  public key:string;
  public objectClass:string[];
  xControl?:ICAFormControl;

  constructor( config?:CAFormConfigItem )
  {
    this.key = config ? config.name : '';
    this.objectClass = config ? config.objectClass : [];
    this.type = config ? config.type : '';

    switch( this.type )
    {
      case CAFormItemAbstract.TYPE_FORM_CONTROL:
        this.xControl = new CAFormControl();
        break;
      case CAFormItemAbstract.TYPE_FORM_GROUP:
        this.xControl = new CAFormGroup();
        break;
      case CAFormItemAbstract.TYPE_FORM_ARRAY:
        this.xControl = new CAFormArray();
        break;
    }
  }

  public isInput():boolean
  {
    return this.subType == CAFormItemAbstract.SUB_TYPE_INPUT_TEXT || this.subType == CAFormItemAbstract.SUB_TYPE_INPUT_PASSWORD;
  }

  public isGroup():boolean
  {
    return this.type == CAFormItemAbstract.TYPE_FORM_GROUP;
  }

  public isControl():boolean
  {
    return this.type == CAFormItemAbstract.TYPE_FORM_CONTROL;
  }

  public isArray():boolean
  {
    return this.type == CAFormItemAbstract.TYPE_FORM_ARRAY;
  }

  public hasControl():boolean
  {
    return this.type == CAFormItemAbstract.TYPE_FORM_GROUP || this.type == CAFormItemAbstract.TYPE_FORM_CONTROL || this.type == CAFormItemAbstract.TYPE_FORM_ARRAY;
  }

  public setFormControlType():void
  {
    this.type = CAFormItem.TYPE_FORM_CONTROL;
  }

  public static getFormGroupItem(key:string, validators:any[] = []):CAFormItem
  {
    return CAFormItemAbstract.getItemWithControl(key, '', validators,CAFormItemAbstract.TYPE_FORM_GROUP);
  }

  public static getInputItem( key:string, subType:string = '', state:any = '', validators:any[] = [] ):CAFormItem
  {
    let item:CAFormItem = CAFormItemAbstract.getItemWithControl( key, state, validators );
    item.subType = subType == ''? CAFormItemAbstract.SUB_TYPE_INPUT_TEXT  : subType;
    return item;
  }

  public static getItemWithControl( key:string, state:any = '', validators:any[] = [], type:string = '' ):CAFormItem
  {
    let item:CAFormItem = new CAFormItem();
    item.key = key;
    item.type = type == '' ? CAFormItemAbstract.TYPE_FORM_CONTROL : type;
    item.xControl = new CAFormControl();
    item.xControl.control = type == CAFormItemAbstract.TYPE_FORM_GROUP ? new FormGroup({}) : new FormControl(state, validators);
    return item;
  }
}
