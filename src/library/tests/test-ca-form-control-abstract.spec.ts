import { CAFormControl } from "../class/ca-form-control.class";
import { CAlertClass} from '@criollapp/common';
import { CACSSUtil} from '@criollapp/theme';
import { EventEmitter } from "@angular/core";
import { CAFormControlAbstract } from "../abstracts/ca-form-control.abstract";
import { CAFormItem } from "../class/ca-form-item.class";
import { CAFormItemAbstract } from "../abstracts/ca-form-item.abstract";

describe('CAFormControlAbstract',()=>{
  let formControl:CAFormControl;

  beforeEach(() => {
    formControl = new CAFormControl();
  });

  it('titleControl has default value',()=>{
    expect( formControl.titleControl == '' ).toBeTruthy();
  });

  it('getFirstItem return first item',()=>{
    let item = new CAFormItem();
    item.key = 'special_key';
    formControl.items.push(item);
    formControl.items.push(new CAFormItem());

    expect( formControl.getFirstItem().key == 'special_key' ).toBeTruthy();
  });

  it('submitText has default value',()=>{
    expect( formControl.submitText == '' ).toBeTruthy();
  });

  it('route has default value',()=>{
    expect( formControl.route == '' ).toBeTruthy();
  });

  it('items has default value',()=>{
    expect( formControl.items.length == 0 ).toBeTruthy();
  });

  it('model has default value',()=>{
    expect( formControl.model == null ).toBeTruthy();
  });

  it('alerts has default value',()=>{
    expect( formControl.alerts.length == 0 ).toBeTruthy();
  });

  it('updateChildModel is called when model change', ()=>{
    spyOn( formControl, 'updateChildModel' );

    formControl.model = 'new model';

    expect( formControl.updateChildModel ).toHaveBeenCalled();
  });

  it('modelChange is emit when model change', ()=>{
    spyOn( formControl.modelChange, 'emit' );

    formControl.model = 'new model';

    expect( formControl.modelChange.emit ).toHaveBeenCalled();
  });

  it('modelChange has default value',()=>{
    expect( formControl.modelChange instanceof EventEmitter ).toBeTruthy();
  });

  it('when alert error is added, alerts collections must have the alert error', () => {
    formControl.addErrorAlert('hello','Hello');

    expect(CAlertClass.alertExists(formControl.alerts, 'hello')).toBeTruthy();
  });

  it('when alert error is added twice, alerts collections not must added twice', () => {
    formControl.addErrorAlert('hello','Hello');
    formControl.addErrorAlert('hello','Hello');

    expect(formControl.alerts.length == 1).toBeTruthy();
  });

  it('removeAlert alert must be deleted', () => {
    formControl.addErrorAlert('hello_1','Hello');
    formControl.addErrorAlert('hello_2','Hello');

    formControl.removeAlert( formControl.alerts[0] );

    expect(formControl.alerts.length == 1).toBeTruthy();
    expect(CAlertClass.alertExists(formControl.alerts, 'hello_2')).toBeTruthy();
    expect(CAlertClass.alertExists(formControl.alerts, 'hello_1')).toBeFalsy();
  });

  it('displaySubmitOn has default value',()=>{
    expect( formControl.displaySubmitOn[0] == CAFormControlAbstract.DISPLAY_SUBMIT_ON_BOTTOM ).toBeTruthy();
  });

  it('alignTitleTo has default value',()=>{
    expect( formControl.alignTitleTo == CACSSUtil.ALIGN_TO_LEFT ).toBeTruthy();
  });

  it('displaySubmitOnBottom return true when is true',()=>{
    expect( formControl.displaySubmitOnBottom() ).toBeTruthy();
  });

  it('displaySubmitOnBottom return false when is false',()=>{
    formControl.displaySubmitOn[0] = CAFormControlAbstract.DISPLAY_SUBMIT_ON_TOP;

    expect( formControl.displaySubmitOnBottom() ).toBeFalsy();
  });

  it('singleTip return null if not have alerts',()=>{
    expect( formControl.singleTip ).toBeNull();
  });

  it('singleTip return first alert by default if we have',()=>{
    formControl.alerts.push(new CAlertClass('hello'));

    expect( formControl.singleTip.message ).toBe('hello');
  });

  it('displaySubmitOnTop return true when is true',()=>{
    formControl.displaySubmitOn[0] = CAFormControlAbstract.DISPLAY_SUBMIT_ON_TOP;

    expect( formControl.displaySubmitOnTop() ).toBeTruthy();
  });

  it('displaySubmitOnTop return false when is false',()=>{

    expect( formControl.displaySubmitOnTop() ).toBeFalsy();
  });

  it('displayAlertOn has default value',()=>{
    expect( formControl.displayAlertOn[0] == CAFormControlAbstract.DISPLAY_ALERTS_ON_BOTTOM_FORM ).toBeTruthy();
  });

  it('displayAlertOnBottom return true when is true',()=>{
    expect( formControl.displayAlertOnBottom() ).toBeTruthy();
  });

  it('displayAlertOnBottom return false when is false',()=>{
    formControl.displayAlertOn[0] = CAFormControlAbstract.DISPLAY_ALERTS_ON_TOP_FORM;

    expect( formControl.displayAlertOnBottom() ).toBeFalsy();
  });

  it('displayAlertOnTop return true when is true',()=>{
    formControl.displayAlertOn[0] = CAFormControlAbstract.DISPLAY_ALERTS_ON_TOP_FORM;

    expect( formControl.displayAlertOnTop() ).toBeTruthy();
  });

  it('displayAlertOnTop return false when is false',()=>{
    expect( formControl.displayAlertOnTop() ).toBeFalsy();
  });

  it('itemsAreGroup return false when is false',()=>{
    expect( formControl.itemsAreGroup() ).toBeFalsy();
  });

  it('itemsAreGroup return true when is true',()=>{
    let item:CAFormItem = new CAFormItem();
    item.type = CAFormItemAbstract.TYPE_FORM_GROUP;
    formControl.addItem( item );

    expect( formControl.itemsAreGroup() ).toBeTruthy();
  });

});
