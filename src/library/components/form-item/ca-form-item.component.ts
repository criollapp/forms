import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CAComponentAbstract } from "@criollapp/components";
import { ICAFormItem } from "../../interfaces/i-ca-form-item.interface";

@Component({
  selector: 'ca-form-item',
  templateUrl: 'ca-form-item.component.html',
  styleUrls: ['ca-form-item.component.css']
})
export class CAFormItemComponent extends CAComponentAbstract
{
  @Input() formItem:ICAFormItem;

  @Output() modelChange:EventEmitter<any> = new EventEmitter<any>();

  private _model:any;

  constructor()
  {
    super();

    this._model = '';
  }

  @Input() set model( model:any )
  {
    if(model != this._model )
    {
      this._model = model;
      this.modelChange.emit(this._model);
    }
  }

  get model()
  {
    return this._model;
  }
}
