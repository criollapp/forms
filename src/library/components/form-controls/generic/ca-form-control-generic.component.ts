import {CACSSUtil} from '@criollapp/theme';
import { Component, AfterViewInit } from "@angular/core";
import { CAFormControlComponentAbstract } from "../../../abstracts/ca-form-control-component.abstract";

@Component({
  selector: 'ca-form-control-generic',
  templateUrl: './ca-form-control-generic.component.html',
  styleUrls: ['./ca-form-control-generic.component.css']
})
export class CAFormControlGenericComponent extends CAFormControlComponentAbstract implements AfterViewInit
{
  ngAfterViewInit(): void
  {
    if( this.isBootstrap() )
    {
      this.formItemsClass.push('form-group');
      this.submitClass.push('btn btn-primary');
    }
  }

  get formClass():string[]
  {
    return [ CACSSUtil.CLASS_CA_FORM ];
  }

  get alertsTopClass():string[]
  {
    return [ CACSSUtil.CLASS_CA_FORM_ALERTS, CACSSUtil.CLASS_CA_FORM_ALERTS_TOP ];
  }

  get alertsBottomClass():string[]
  {
    return [ CACSSUtil.CLASS_CA_FORM_ALERTS, CACSSUtil.CLASS_CA_FORM_ALERTS_BOTTOM ];
  }

  get divSubmitButtonBottomClass():string[]
  {
    return [ CACSSUtil.CLASS_CA_SUBMIT, CACSSUtil.CLASS_CA_FORM_SUBMIT, CACSSUtil.CLASS_CA_FORM_SUBMIT_BOTTOM, CACSSUtil.CLASS_CA_BUTTON ];
  }

    get divSubmitButtonTopClass():string[]
    {
        return [ CACSSUtil.CLASS_CA_SUBMIT, CACSSUtil.CLASS_CA_FORM_SUBMIT, CACSSUtil.CLASS_CA_FORM_SUBMIT_TOP, CACSSUtil.CLASS_CA_BUTTON ];
    }
}
