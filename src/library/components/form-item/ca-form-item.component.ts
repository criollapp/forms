import { Component, Input, Output, EventEmitter, forwardRef } from "@angular/core";
import { CAComponentAbstract } from "@criollapp/components";
import { ICAFormItem } from "../../interfaces/i-ca-form-item.interface";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
    selector: 'ca-form-item',
    templateUrl: 'ca-form-item.component.html',
    styleUrls: ['ca-form-item.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CAFormItemComponent),
            multi: true
        }
    ]
})
export class CAFormItemComponent extends CAComponentAbstract implements ControlValueAccessor
{
  @Input() formItem:ICAFormItem;

  private _model:any;

  constructor()
  {
    super();

    this._model = '';
  }

    get value(): any {
        return this._model;
    };

    @Input() set value(v: any) {
        if (v !== this._model) {
            this._model = v;
            this.onChange(v);
        }
    }

    onChange = (value: any) => {};

    onTouched = () => {};

    writeValue(value: any): void {
        this.value = value;
        this.onChange(this.value)
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
}
