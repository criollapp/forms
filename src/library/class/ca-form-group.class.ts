import { FormGroup } from "@angular/forms";
import { CAFormControlAbstract } from "../abstracts/ca-form-control.abstract";
import { CAFormItem } from "./ca-form-item.class";
import { ICAFormItem } from "../interfaces/i-ca-form-item.interface";

export class CAFormGroup extends CAFormControlAbstract
{
  public control: FormGroup;

  constructor()
  {
    super();

    this.control = new FormGroup({});
  }

  updateChildModel():void
  {
    this.items.forEach((item:ICAFormItem)=>{
      if(item.xControl && this.model && this.model.hasOwnProperty(item.key))
      {
        item.xControl.route = item.key;
        item.xControl.parentModel = this.model;
        item.xControl.modelChange.subscribe((model)=>{
          this.model[item.key] = model;
        });
      }
    });
  }

  protected buildFormControlFromItems(items:ICAFormItem[])
  {
    this.control = new FormGroup({});
    items.forEach((item:ICAFormItem)=>{
      if(item.xControl) {
        this.control.addControl( item.key, item.xControl.control );
      }
    });
  }

  public addItem(item:ICAFormItem):void
  {
    if(item.xControl)
    {
      this.control.addControl( item.key, item.xControl.control );
    }
    this.items.push(item);
    this.updateChildModel();
  }
}
