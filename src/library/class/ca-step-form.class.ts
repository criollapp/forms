import {CAStepAbstract} from '@criollapp/components';
import { ICAForm } from "../interfaces/i-ca-form.interface";
import {CAGeneratorUtil} from "@criollapp/common";

export class CAStepForm extends CAStepAbstract
{
  public form:ICAForm;

  protected getIdFrom():string
  {
    return this.form.model.id ? this.form.model.id : CAGeneratorUtil.getFakeId().toString();
  }

  protected getTypeFrom():string
  {
    return CAStepAbstract.TYPE_FORM;
  }
}
