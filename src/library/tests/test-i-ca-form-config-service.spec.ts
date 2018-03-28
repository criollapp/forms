import { TestICAFormConfigServiceImplementation } from "./utils/test-i-ca-form-config-service-implementation.util";
import { ICAFormConfigService } from "../interfaces/i-ca-form-config-service.interface";
import { CAFormConfig } from "../class/config/ca-form-config.class";

describe('ICAFormConfigService',()=>{
  let service:ICAFormConfigService = new TestICAFormConfigServiceImplementation();

  it('has getFormConfig method',()=>{
    expect(service.getFormConfig() instanceof Promise).toBeTruthy();
  });

  it('has setFormConfig method',()=>{
    expect(service.setFormConfig(new CAFormConfig()) instanceof Promise).toBeTruthy();
  });
});
