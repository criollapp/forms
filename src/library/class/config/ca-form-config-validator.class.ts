import {CAClassAbstract} from '@criollapp/common';
import { ValidatorFn } from "@angular/forms";
import { CAFormConfigItem } from "./ca-form-config-item.class";
import { CAValidators } from "../../validators/ca-validators";

export class CAFormConfigValidator extends CAClassAbstract {
  public name:string;
  public validator:ValidatorFn;
  public params:any[];
  public type:string;

  constructor( name:string, params:any[] = [], type:string = '' )
  {
    super();

    this.name = name;
    this.params = params;
    this.type = type == '' ? CAFormConfigItem.CONTROL_TYPE_FORM_CONTROL : type;
    this.validator = CAValidators.getValidatorByConfig(this);
  }
}
