import {CArrayUtil} from '@criollapp/common';
import { CAFormConfigValidator } from "../class/config/ca-form-config-validator.class";
import { CAFormConfigItem } from "../class/config/ca-form-config-item.class";
import { CAValidators } from "../validators/ca-validators";

describe('CAFormConfigValidator',()=>{
  let config:CAFormConfigValidator = new CAFormConfigValidator( CAValidators.VALIDATOR_REQUIRED, [3,4] );

  it('attrs are there',()=>{
    expect( typeof config.name == 'string').toBeTruthy();
    expect( config.params != null).toBeTruthy();
    expect( config.validator != null).toBeTruthy();
  });

  it('params are set when it pass for constructor',()=>{
    expect( CArrayUtil.areEqual(config.params, [3,4]) );
  });

  it('name is set whe its pass by the constructor',()=>{
    expect( config.name == CAValidators.VALIDATOR_REQUIRED ).toBeTruthy();
  });

  it('controlType is form controlby default whe it is empty',()=>{
    expect( config.type == CAFormConfigItem.CONTROL_TYPE_FORM_CONTROL ).toBeTruthy();
  });

  it('controlType is set whe it is put in params',()=>{
    let otherConfig:CAFormConfigValidator = new CAFormConfigValidator( CAValidators.VALIDATOR_REQUIRED, [], CAFormConfigItem.CONTROL_TYPE_FORM_GROUP );

    expect( otherConfig.type == CAFormConfigItem.CONTROL_TYPE_FORM_GROUP ).toBeTruthy();
  });
});
