import {CAComponentAbstract} from '@criollapp/components';
import {CACSSUtil} from '@criollapp/theme';
import { EventEmitter, Output, Input } from "@angular/core";
import { CAFormGroup } from "../class/ca-form-group.class";
import { ICAFormControl } from "../interfaces/i-ca-form-control.interface";
import { CAFormControlAbstract } from "./ca-form-control.abstract";

export abstract class CAFormControlComponentAbstract extends CAComponentAbstract
{
  public formItemsContainerClass:string[];
  public formGroupContainerClass:string[];
  public formItemsClass:string[];
  public formGroupClass:string[];
  public submitClass:string[];
  protected _titleClass:string[];
  protected _caFormControl:ICAFormControl;

  @Output() caFormControlChange:EventEmitter<ICAFormControl> = new EventEmitter();
  @Output() submitClicked:EventEmitter<void> = new EventEmitter();

  constructor()
  {
    super();

    this.caFormControl = new CAFormGroup();
    this.formItemsClass = [CACSSUtil.CLASS_CA_FORM_ITEMS];
    this.formGroupClass = [CACSSUtil.CLASS_CA_FORM_GROUP];
    this.formItemsContainerClass = [CACSSUtil.CLASS_CA_FORM_ITEMS_CONTAINER];
    this.formGroupContainerClass = [CACSSUtil.CLASS_CA_FORM_GROUP_CONTAINER];
    this.submitClass = [CACSSUtil.CLASS_CA_FORM_SUBMIT];
    this._titleClass = [CACSSUtil.CLASS_CA_FORM_TITLE+ ' '+CACSSUtil.CLASS_CA_TITLE];
    this.caFormControl.displayAlertOn = [ CAFormControlAbstract.DISPLAY_ALERTS_ON_BOTTOM_FORM ];
  }

  get titleClass():string[]
  {
    return this._titleClass.concat( CACSSUtil.getAlign( this._caFormControl.alignTitleTo, this.frameworkName ));
  }

  get caFormControl():ICAFormControl
  {
    return this._caFormControl;
  }

  @Input() set caFormControl( formControl:ICAFormControl )
  {
    if( formControl != this.caFormControl )
    {
      this._caFormControl = formControl;
      this.caFormControlChange.emit( this.caFormControl );
    }
  }
}
