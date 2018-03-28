import {CAGeneratorUtil,CArrayUtil} from '@criollapp/common';
import { CAFormConfig } from "../class/config/ca-form-config.class";

describe('CAFormConfig', ()=>{
  let config:CAFormConfig = new CAFormConfig();
  config.key = CAGeneratorUtil.getFakeId().toString();

  it('has attrs',()=>{
    expect( config.key != null ).toBeTruthy();
    expect( config.items != null ).toBeTruthy();
  });

  it('items has empty array by default', ()=>{
    expect( CArrayUtil.isEmpty( config.items ) ).toBeTruthy();
  });

  it('set label set object into labels and labels return labels',()=>{
    config.setLabels( { 'en': {'FORMS.DEFAULT_FAIL': 'Este formulario no tiene una accion implementada'} } );
    config.labels('FORMS.DEFAULT_FAIL').subscribe((label:string)=>{
      expect( label == 'Este formulario no tiene una accion implementada' ).toBeTruthy();
    });
  });
});
