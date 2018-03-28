import { FormArray } from "@angular/forms";
import { CAFormControlAbstract } from "../abstracts/ca-form-control.abstract";
import { CAFormItem } from "./ca-form-item.class";
import { ICAFormItem } from "../interfaces/i-ca-form-item.interface";

export class CAFormArray extends CAFormControlAbstract
{
  public control: FormArray;

  constructor()
  {
    super();

    this.control = new FormArray([]);
  }

  protected buildFormControlFromItems(items:ICAFormItem[])
  {
    this.control = new FormArray([]);
    items.forEach((item:ICAFormItem)=>{
      if(item.xControl) {
        this.control.push( item.xControl.control );
      }
    });
  }

  public addItem(item:ICAFormItem):void
  {
    if(item.xControl)
    {
      this.control.push( item.xControl.control );
    }
    this.items.push(item);
  }
}
