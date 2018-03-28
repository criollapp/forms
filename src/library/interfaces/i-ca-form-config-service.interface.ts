import {CABooleanResponse} from '@criollapp/common';
import { CAFormConfig } from "../class/config/ca-form-config.class";
import { CAFormConfigResponse } from "../class/config/ca-form-config.response";

export interface ICAFormConfigService
{
  getFormConfig(): Promise<CAFormConfigResponse>;
  setFormConfig( formConfig:CAFormConfig ): Promise<CABooleanResponse>;
}
