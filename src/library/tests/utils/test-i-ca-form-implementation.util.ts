import { ICAForm } from "../../interfaces/i-ca-form.interface";
import { EventEmitter } from "@angular/core";
import { ICAFormConfigService } from "../../interfaces/i-ca-form-config-service.interface";
import { CAFormGroup } from "../../class/ca-form-group.class";
import { ICAFormControl } from "../../interfaces/i-ca-form-control.interface";
import { ICAResponse } from "@criollapp/common";

export class TestICAFormImplementation implements ICAForm
{
  public form: ICAFormControl;

  public beforeAction: EventEmitter<ICAResponse> = new EventEmitter();
  public action: EventEmitter<ICAResponse> = new EventEmitter();
  public successfulAction: EventEmitter<ICAResponse> = new EventEmitter();
  public failAction: EventEmitter<ICAResponse> = new EventEmitter();
  public endAction: EventEmitter<ICAResponse> = new EventEmitter();

  public statusChange: EventEmitter<string> = new EventEmitter();
  public modelChange: EventEmitter<ICAResponse> = new EventEmitter();
  public configServiceChange: EventEmitter<ICAFormConfigService> = new EventEmitter();
  public builded: EventEmitter<void> = new EventEmitter();
  public buildFailed: EventEmitter<void> = new EventEmitter();

  constructor()
  {
    this.form = new CAFormGroup();
  }
}
