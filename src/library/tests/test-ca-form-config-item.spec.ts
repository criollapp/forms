import { CAFormConfigItem } from "../class/config/ca-form-config-item.class";

describe('caFormConfigItem', ()=>{
  let config:CAFormConfigItem = new CAFormConfigItem();

  it('attr exists',()=>{
    expect(config.name != null).toBeTruthy();
    expect(config.label != null).toBeTruthy();
    expect(config.shortDescription != null).toBeTruthy();
    expect(config.validators != null).toBeTruthy();
  });
});
