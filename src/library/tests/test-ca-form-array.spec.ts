import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { CAFormItem } from "../class/ca-form-item.class";
import { CAFormArray } from "../class/ca-form-array.class";

describe('CAFormArray',()=>{
  let formArray:CAFormArray;

  beforeEach(() => {
    formArray = new CAFormArray();
  });

  it('xControl has FormArray instance',()=>{
    expect( formArray.control instanceof FormArray ).toBeTruthy();
  });

  it('FormArray is reset when new items are set', ()=>{
    formArray.control = new FormArray([]);
    formArray.control.push(new FormControl('value'));

    formArray.items = [new CAFormItem()];

    expect(formArray.control.length == 0).toBeTruthy();
  });

  it('forArray create when items are set', ()=>{
    formArray.items = [CAFormItem.getItemWithControl('example1', 'value1'), CAFormItem.getItemWithControl('example2','value2')];

    expect(formArray.control.at(0).value == 'value1').toBeTruthy();
    expect(formArray.control.at(1).value == 'value2').toBeTruthy();
  });

  it('addItem works',()=>{
    formArray.addItem( CAFormItem.getItemWithControl('example') );

    expect( formArray.items[0].key == 'example' ).toBeTruthy();
  });

  it('addItem should add xControl to form object',()=>{
    formArray.addItem( CAFormItem.getItemWithControl('example2', 'value2') );

    expect(formArray.control.at(0).value == 'value2').toBeTruthy();
  });

});
