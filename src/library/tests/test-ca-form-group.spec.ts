import { CAFormGroup } from "../class/ca-form-group.class";
import { FormGroup, FormControl } from "@angular/forms";
import { CAFormItem } from "../class/ca-form-item.class";
import { CAFormControl } from "../class/ca-form-control.class";

describe('CAFormGroup',()=>{
  let formGroup:CAFormGroup;

  beforeEach(() => {
    formGroup = new CAFormGroup();
  });

  it('xControl has FormGroup instance',()=>{
    expect( formGroup.control instanceof FormGroup ).toBeTruthy();
  });

  it('formGroup is reset when new items are set', ()=>{
    formGroup.control = new FormGroup({});
    formGroup.control.addControl('example', new FormControl());

    formGroup.items = [new CAFormItem()];

    expect(formGroup.control.contains('example')).toBeFalsy();
  });

  it('formGroup create form group from items set', ()=>{
    formGroup.control = new FormGroup({});
    let item:CAFormItem = new CAFormItem();
    item.xControl = new CAFormControl();
    item.xControl.control = new FormControl();
    item.key = 'example1';
    let newItems:CAFormItem[] = [item];
    let item2:CAFormItem = new CAFormItem();
    item2.xControl = new CAFormControl();
    item2.xControl.control = new FormControl();
    item2.key = 'example2';
    newItems.push(item2);

    formGroup.items = newItems;

    expect(formGroup.control.contains('example1')).toBeTruthy();
    expect(formGroup.control.contains('example2')).toBeTruthy();
  });

  it('addItem works',()=>{
    formGroup.addItem( CAFormItem.getItemWithControl('example') );

    expect( formGroup.items[0].key == 'example' ).toBeTruthy();
  });

  it('addItem call updateChildModel',()=>{
    spyOn( formGroup, 'updateChildModel' );

    formGroup.addItem( CAFormItem.getItemWithControl('example') );

    expect( formGroup.updateChildModel ).toHaveBeenCalled();
  });

  it('updateChildModel create binding between item model and control model',()=>{
    formGroup.model = {example: 'myValue'};
    formGroup.addItem( CAFormItem.getItemWithControl('example') );

    formGroup.items[0].xControl.model = 'myValue1';

    expect( formGroup.model.example == 'myValue1' ).toBeTruthy();
  });

  it('updateChildModel create binding between model and item model',()=>{
    formGroup.model = {example: 'myValue'};
    formGroup.addItem( CAFormItem.getItemWithControl('example') );

    formGroup.model.example = 'myValue1';

    expect( formGroup.items[0].xControl.model == 'myValue1' ).toBeTruthy();
  });

  it('addItem should add xControl to form object',()=>{
    formGroup.addItem( CAFormItem.getItemWithControl('example2') );

    expect( formGroup.control.contains('example2') ).toBeTruthy();
  });

});
