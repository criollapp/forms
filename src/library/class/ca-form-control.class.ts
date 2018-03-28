import { CAFormControlAbstract } from "../abstracts/ca-form-control.abstract";
import { FormControl } from "@angular/forms";
import { ICAFormItem } from "../interfaces/i-ca-form-item.interface";

export class CAFormControl extends CAFormControlAbstract
{
  public control: FormControl;

  constructor()
  {
    super();

    this.control = new FormControl();
  }

  protected get _model()
  {
      return this.route != '' && this.parentModel ? this.parentModel[ this.route ] : null;
  }

  protected set _model( newModel )
  {
    if(this.route != '' && this.parentModel)
    {
      this.parentModel[ this.route ] = newModel;
    }
  }

  protected buildFormControlFromItems(items:ICAFormItem[])
  {
    if(items.length > 0)
    {
      this.addItem(items[0]);
    }
    else {
      this.control = new FormControl('');
    }
  }

  public addItem(item:ICAFormItem):void
  {
    this.items = [];
    if(item.xControl) {
      this.control = item.xControl.control as FormControl;
    }
    this.items.push( item );
  }
}
