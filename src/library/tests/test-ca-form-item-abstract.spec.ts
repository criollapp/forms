import { TestCAFormItemAbstractComponent } from "./utils/test-ca-form-item-abstract-component.util";
import { CAFormItemAbstract } from "../abstracts/ca-form-item.abstract";
import {CArrayUtil} from '@criollapp/common';
import { CAFormItem } from "../class/ca-form-item.class";
import { CAFormControl } from "../class/ca-form-control.class";
import { CAValidators } from "../validators/ca-validators";
import { CAFormGroup } from "../class/ca-form-group.class";
import { CAFormArray } from "../class/ca-form-array.class";
import { FormGroup } from "@angular/forms";
import { CAFormConfigItem } from "../class/config/ca-form-config-item.class";

describe('CAFormItemAbstract', ()=>{
  let item:TestCAFormItemAbstractComponent = new TestCAFormItemAbstractComponent();
  let config:CAFormConfigItem = new CAFormConfigItem();
  config.name = 'example';
  config.type = CAFormItemAbstract.TYPE_FORM_CONTROL;
  config.objectClass = ['example1','example2'];

  it('has attrs with default values',()=>{
    expect( item.key ).toBe('');
    expect( item.type ).toBe('');
    expect( CArrayUtil.areEqual( item.objectClass, [] ) ).toBeTruthy();
  });

  it('type get the value from config type',()=>{
    let otherItem:TestCAFormItemAbstractComponent = new TestCAFormItemAbstractComponent(config);

    expect( config.type == otherItem.type ).toBeTruthy();
  });

  it('key get the value from config name',()=>{
    let otherItem:TestCAFormItemAbstractComponent = new TestCAFormItemAbstractComponent(config);

    expect( config.name == otherItem.key ).toBeTruthy();
  });

  it('objectClass get the value from config objectClass',()=>{
    let otherItem:TestCAFormItemAbstractComponent = new TestCAFormItemAbstractComponent(config);

    expect( CArrayUtil.areEqual(otherItem.objectClass, config.objectClass) ).toBeTruthy();
  });

  it('setFormControlType type must be form xControl',()=>{
    item.setFormControlType();

    expect( item.type == CAFormItemAbstract.TYPE_FORM_CONTROL ).toBeTruthy();
  });

  it('getItemWithControl get item  with correct data',()=>{
    let item:CAFormItem = CAFormItemAbstract.getItemWithControl('example', 'value', [CAValidators.required]);

    expect( item.key == 'example' ).toBeTruthy();
    expect( item.type == CAFormItemAbstract.TYPE_FORM_CONTROL ).toBeTruthy();
    expect( item.xControl.control.value == 'value' ).toBeTruthy();
    expect( item.xControl instanceof CAFormControl ).toBeTruthy();
  });

  it('getItemWithControl when type is other, return correct type',()=>{
    let item:CAFormItem = CAFormItemAbstract.getItemWithControl('example', 'value', [CAValidators.required], CAFormItemAbstract.TYPE_FORM_GROUP);

    expect( item.type == CAFormItemAbstract.TYPE_FORM_GROUP ).toBeTruthy();
    expect( item.xControl.control instanceof FormGroup).toBeTruthy();
  });

  it('getInputItem has correct data',()=>{
    let item:CAFormItem = CAFormItemAbstract.getInputItem('example', '', 'value', [CAValidators.required]);

    expect( item.key == 'example' ).toBeTruthy();
    expect( item.subType == CAFormItemAbstract.SUB_TYPE_INPUT_TEXT ).toBeTruthy();
    expect( item.xControl.control.value == 'value' ).toBeTruthy();
    expect( item.xControl instanceof CAFormControl ).toBeTruthy();
  });

  it('getInputItem return item with subType',()=>{
    let item:CAFormItem = CAFormItemAbstract.getInputItem('example', CAFormItemAbstract.SUB_TYPE_INPUT_PASSWORD, 'value', [CAValidators.required]);

    expect( item.subType == CAFormItemAbstract.SUB_TYPE_INPUT_PASSWORD ).toBeTruthy();
  });

  it('hasControl return true if is form_control',()=>{
    item.type = CAFormItemAbstract.TYPE_FORM_CONTROL;

    expect(item.hasControl()).toBeTruthy();
  });

  it('hasControl return true if is form_group',()=>{
    item.type = CAFormItemAbstract.TYPE_FORM_GROUP;

    expect(item.hasControl()).toBeTruthy();
  });

  it('hasControl return true if is form_array',()=>{
    item.type = CAFormItemAbstract.TYPE_FORM_ARRAY;

    expect(item.hasControl()).toBeTruthy();
  });

  it('hasControl return false if is no correct',()=>{
    item.type = 'type_wtf';

    expect(item.hasControl()).toBeFalsy();
  });

  it('getFormGroupItem return item with group type',()=>{
    let item:CAFormItem = CAFormItemAbstract.getFormGroupItem('example', []);

    expect( item.type == CAFormItemAbstract.TYPE_FORM_GROUP ).toBeTruthy();
    expect( item.key == 'example' ).toBeTruthy();
    expect( item.xControl.control instanceof FormGroup ).toBeTruthy();
  });

  it('item has FormGroup item when type is form_group',()=>{
    let config:CAFormConfigItem = new CAFormConfigItem();
    config.type = CAFormConfigItem.CONTROL_TYPE_FORM_GROUP;

    let item:CAFormItem = new CAFormItem(config);

    expect( item.xControl instanceof CAFormGroup).toBeTruthy();
  });

  it('item has FormControl item when type is form_control',()=>{
    let config:CAFormConfigItem = new CAFormConfigItem();
    config.type = CAFormConfigItem.CONTROL_TYPE_FORM_CONTROL;

    let item:CAFormItem = new CAFormItem(config);

    expect( item.xControl instanceof CAFormControl ).toBeTruthy();
  });

  it('item has FormArray item when type is form_array',()=>{
    let config:CAFormConfigItem = new CAFormConfigItem();
    config.type = CAFormConfigItem.CONTROL_TYPE_FORM_ARRAY;

    let item:CAFormItem = new CAFormItem(config);

    expect( item.xControl instanceof CAFormArray ).toBeTruthy();
  });

  it('isInput return false when is false', ()=>{
    expect( item.isInput() ).toBeFalsy();
  });

  it('isInput return true when subType is text', ()=>{
    item.subType = 'text';

    expect( item.isInput() ).toBeTruthy();
  });

  it('isInput return true when subType is password', ()=>{
    item.subType = 'password';

    expect( item.isInput() ).toBeTruthy();
  });

  it('isGroup return false when is false', ()=>{
    expect( item.isGroup() ).toBeFalsy();
  });

  it('isGroup return true when is true', ()=>{
    item.type = CAFormItemAbstract.TYPE_FORM_GROUP;

    expect( item.isGroup() ).toBeTruthy();
  });

  it('isControl return false when is false', ()=>{
    expect( item.isControl() ).toBeFalsy();
  });

  it('isControl return true when is true', ()=>{
    item.type = CAFormItemAbstract.TYPE_FORM_CONTROL;

    expect( item.isControl() ).toBeTruthy();
  });

  it('isArray return false when is false', ()=>{
    expect( item.isArray() ).toBeFalsy();
  });

  it('isArray return true when is true', ()=>{
    item.type = CAFormItemAbstract.TYPE_FORM_ARRAY;

    expect( item.isArray() ).toBeTruthy();
  });
});
