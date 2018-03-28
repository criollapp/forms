import { Validators, ValidatorFn, AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { CAFormConfigValidator } from "../class/config/ca-form-config-validator.class";
import { CAFormConfigItem } from "../class/config/ca-form-config-item.class";
export class CAValidators extends Validators {

  public static readonly VALIDATOR_MIN = 'min';
  public static readonly VALIDATOR_MAX = 'max';
  public static readonly VALIDATOR_REQUIRED = 'required';
  public static readonly VALIDATOR_REQUIRED_TRUE = 'required_true';
  public static readonly VALIDATOR_EMAIL = 'email';
  public static readonly VALIDATOR_MIN_LENGTH = 'min_length';
  public static readonly VALIDATOR_MAX_LENGTH = 'max_length';
  public static readonly VALIDATOR_PATTERN = 'pattern';
  public static readonly VALIDATOR_NULL = 'null';

  public static getValidatorByConfig(config:CAFormConfigValidator):any
  {
      let control:AbstractControl;
      switch(config.type)
      {
        case CAFormConfigItem.CONTROL_TYPE_FORM_CONTROL:
          control = new FormControl();
          break;
        case CAFormConfigItem.CONTROL_TYPE_FORM_GROUP:
          control = new FormGroup({});
          break;
        default:
          control = new FormControl();
      }

      let validator:any;
      switch(config.name)
      {
        case CAValidators.VALIDATOR_MIN:
          validator = CAValidators.min(config.params[0]);
          break;
        case CAValidators.VALIDATOR_MAX:
          validator = CAValidators.max(config.params[0]);
          break;
        case CAValidators.VALIDATOR_REQUIRED:
          validator = CAValidators.required(control);
          break;
        case CAValidators.VALIDATOR_REQUIRED_TRUE:
          validator = CAValidators.requiredTrue(control);
          break;
        case CAValidators.VALIDATOR_EMAIL:
          validator = CAValidators.email(control);
          break;
        case CAValidators.VALIDATOR_MIN_LENGTH:
          validator = CAValidators.minLength(config.params[0]);
          break;
        case CAValidators.VALIDATOR_MAX_LENGTH:
          validator = CAValidators.maxLength(config.params[0]);
          break;
        case CAValidators.VALIDATOR_PATTERN:
          validator = CAValidators.pattern(config.params[0]);
          break;
        case CAValidators.VALIDATOR_NULL:
          validator = CAValidators.nullValidator(control);
      }
      return validator;
  }
}
