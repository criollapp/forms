import { ICAFormControl } from "../../interfaces/i-ca-form-control.interface";
import { CAFormControlAbstract } from "../../abstracts/ca-form-control.abstract";
import { ICAFormItem } from "../../interfaces/i-ca-form-item.interface";

export class TestICAFormControlImplementation extends CAFormControlAbstract implements ICAFormControl
{
  protected buildFormControlFromItems(items:ICAFormItem[])
  {

  }

  public addItem(item:ICAFormItem):void
  {

  }
}
