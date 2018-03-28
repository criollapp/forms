import { ICAFormControl } from "../interfaces/i-ca-form-control.interface";
import { TestICAFormControlImplementation } from "./utils/test-i-ca-form-control-implementation.util";
import {CAlertClass} from '@criollapp/common';
import {CACSSUtil} from '@criollapp/theme';
import { EventEmitter } from "@angular/core";
import { CAFormItemAbstract } from "../abstracts/ca-form-item.abstract";
import { CAFormItem } from "../class/ca-form-item.class";

describe('ICAFormControl',()=>{
  let implementation:ICAFormControl = new TestICAFormControlImplementation();

  it('has items attr',()=>{
    expect( implementation.items.length == 0 ).toBeTruthy();
  });

  it('has getFirstItem method',()=>{
    implementation.items.push(new CAFormItem());

    expect( implementation.getFirstItem() instanceof CAFormItem ).toBeTruthy();
  });

  it('has model attr',()=>{
    expect( implementation.model == null ).toBeTruthy();
  });

  it('has alignTitleTo attr',()=>{
    expect( implementation.alignTitleTo == CACSSUtil.ALIGN_TO_LEFT ).toBeTruthy();
  });

  it('has model attr',()=>{
    expect( implementation.route == '' ).toBeTruthy();
  });

  it('has alerts attr',()=>{
    expect( implementation.alerts.length == 0 ).toBeTruthy();
  });

  it('has actionType attr',()=>{
    expect( implementation.actionType == undefined ).toBeTruthy();
  });

  it('has submitText attr',()=>{
    expect( implementation.submitText == '' ).toBeTruthy();
  });

  it('has displayAlertOn attr',()=>{
    expect( implementation.displayAlertOn.length == 1 ).toBeTruthy();
  });

  it('has displaySubmitOn attr',()=>{
    expect( implementation.displaySubmitOn.length == 1 ).toBeTruthy();
  });

  it('has modelChange attr',()=>{
    expect( implementation.modelChange instanceof EventEmitter ).toBeTruthy();
  });

  it('has titleControl attr',()=>{
    expect( implementation.titleControl == '' ).toBeTruthy();
  });

  it('has removeAlert method',()=>{
    expect( typeof implementation.removeAlert(new CAlertClass()) == "undefined" ).toBeTruthy();
  });

  it('has addErrorAlert method',()=>{
    expect( typeof implementation.addErrorAlert('klk','hello') == "undefined" ).toBeTruthy();
  });

  it('has displayAlertOnTop method',()=>{
    expect( typeof implementation.displayAlertOnTop() == "boolean" ).toBeTruthy();
  });

  it('has displayAlertOnBottom method',()=>{
    expect( typeof implementation.displayAlertOnBottom() == "boolean" ).toBeTruthy();
  });

  it('has displaySubmitOnBottom method',()=>{
    expect( typeof implementation.displaySubmitOnBottom() == "boolean" ).toBeTruthy();
  });

  it('has displaySubmitOnTop method',()=>{
      expect( typeof implementation.displaySubmitOnTop() == "boolean" ).toBeTruthy();
  });

  it('has itemsAreGroup method',()=>{
    expect( typeof implementation.itemsAreGroup() == "boolean" ).toBeTruthy();
  });
});
