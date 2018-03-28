import { ICAFormConfigService } from "../../interfaces/i-ca-form-config-service.interface";
import { Injectable } from "@angular/core";
import {CABooleanResponse} from '@criollapp/common';
import { CAFormConfig } from "../../class/config/ca-form-config.class";
import { CAFormConfigResponse } from "../../class/config/ca-form-config.response";

@Injectable()
export class TestICAFormConfigServiceImplementation implements ICAFormConfigService
{
  public formConfig:CAFormConfig;
  public fail:boolean;

  constructor()
  {
    this.formConfig = new CAFormConfig();
    this.fail = false;
  }

  getFormConfig(): Promise<CAFormConfigResponse>
  {
    let response:CAFormConfigResponse = new CAFormConfigResponse();
    response.data = this.formConfig;
    return this.fail ? Promise.reject(response) : Promise.resolve(response);
  }

  setFormConfig( formConfig:CAFormConfig ): Promise<CABooleanResponse>
  {
      this.formConfig = formConfig;
      let response:CABooleanResponse = new CABooleanResponse();
      response.data = true;
      return Promise.resolve(response);
  }
}
