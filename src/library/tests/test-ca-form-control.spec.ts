import { CAFormControl } from "../class/ca-form-control.class";
import { FormControl } from "@angular/forms";
import { CAFormItemAbstract } from "../abstracts/ca-form-item.abstract";

describe('CAFormControl',()=>{
  let formControl:CAFormControl;

  beforeEach(() => {
    formControl = new CAFormControl();
  });

  it('xControl has FormControl instance',()=>{
    expect( formControl.control instanceof FormControl ).toBeTruthy();
  });

  it('set control when items are set',()=>{
    formControl.items = [ CAFormItemAbstract.getItemWithControl('example', 'value') ];

    expect( formControl.control.value == 'value' ).toBeTruthy();
  });

  it('reset control when empty items are set',()=>{
    formControl.items = [ CAFormItemAbstract.getItemWithControl('example', 'value') ];
    formControl.items = [];

    expect( formControl.control.value == '' ).toBeTruthy();
  });

  it('addItem with control, it must take control',()=>{
    formControl.addItem( CAFormItemAbstract.getItemWithControl('example', 'value') );

    expect( formControl.control.value == 'value' ).toBeTruthy();
  });

  it('addItem item must be replace',()=>{
    formControl.addItem( CAFormItemAbstract.getItemWithControl('example', 'value') );
    formControl.addItem( CAFormItemAbstract.getItemWithControl('example2', 'value2') );

    expect( formControl.items[0].key == 'example2' ).toBeTruthy();
    expect( formControl.items.length == 1 ).toBeTruthy();
  });

});
