import { CAFormConfigResponse } from "../class/config/ca-form-config.response";
import { CAFormConfig } from "../class/config/ca-form-config.class";

describe('caFormConfigResponse',()=>{
  let response:CAFormConfigResponse = new CAFormConfigResponse();

  it('data is instance of caFormConfig', ()=>{
    expect(response.data instanceof CAFormConfig).toBeTruthy();
  });
});
