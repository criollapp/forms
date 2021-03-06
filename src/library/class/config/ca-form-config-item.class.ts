import {CAClassAbstract} from '@criollapp/common';
import { CAFormConfigValidator } from "./ca-form-config-validator.class";

export class CAFormConfigItem extends CAClassAbstract {
  public name:string;
  public label:string;
  public shortDescription:string;
  public validators:CAFormConfigValidator[];
  public objectClass:string[];
  public type:string;

  public static readonly CONTROL_TYPE_FORM_CONTROL:string = 'form_control';
  public static readonly CONTROL_TYPE_FORM_GROUP:string = 'form_group';
  public static readonly CONTROL_TYPE_FORM_ARRAY:string = 'form_array';

  constructor()
  {
    super();

    this.label = '';
    this.shortDescription = '';
    this.name = '';
    this.type = CAFormConfigItem.CONTROL_TYPE_FORM_CONTROL;
    this.validators = [];
    this.objectClass = [];
  }
}
