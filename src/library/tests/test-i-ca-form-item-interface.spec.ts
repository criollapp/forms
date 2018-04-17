import { ICAFormItem } from "../interfaces/i-ca-form-item.interface";
import { TestICAFormItemImplementation } from "./utils/test-i-ca-form-item-implementation.util";
import {CAObjectUtil} from '@criollapp/common';

describe('ICAFormItem',()=>{
  let formItem:ICAFormItem = new TestICAFormItemImplementation();

  it('has label attr',()=>{
    expect(formItem.label == '').toBeTruthy();
  });

  it('has key attr',()=>{
    expect(formItem.key == '').toBeTruthy();
  });

  it('has controlType attr',()=>{
    expect(formItem.type == '').toBeTruthy();
  });

  it('has isInput method',()=>{
    expect(typeof formItem.isInput() == 'boolean').toBeTruthy();
  });

  it('has isGroup method',()=>{
    expect(typeof formItem.isGroup() == 'boolean').toBeTruthy();
  });

  it('has isControl method',()=>{
    expect(typeof formItem.isControl() == 'boolean').toBeTruthy();
  });

  it('has isArray method',()=>{
    expect(typeof formItem.isArray() == 'boolean').toBeTruthy();
  });

  it('has objectClass attr',()=>{
    expect( CAObjectUtil.areEqual(formItem.objectClass, {}) ).toBeTruthy();
  });
});
