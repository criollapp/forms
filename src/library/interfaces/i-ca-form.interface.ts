import { EventEmitter } from "@angular/core";
import { ICAFormConfigService } from "./i-ca-form-config-service.interface";
import {ICAResponse} from '@criollapp/common';
import { CAFormGroup } from "../class/ca-form-group.class";
import { ICAFormControl } from "./i-ca-form-control.interface";

export interface ICAForm
{
  form: ICAFormControl;

  beforeAction: EventEmitter<ICAResponse>;
  action: EventEmitter<ICAResponse>;
  successfulAction: EventEmitter<ICAResponse>;
  failAction: EventEmitter<ICAResponse>;
  endAction: EventEmitter<ICAResponse>;

  statusChange: EventEmitter<string>;
  modelChange: EventEmitter<ICAResponse>;
  configServiceChange: EventEmitter<ICAFormConfigService>;
  builded: EventEmitter<void>;
  buildFailed: EventEmitter<void>;
}
