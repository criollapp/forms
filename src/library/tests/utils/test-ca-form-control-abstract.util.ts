import { Component } from "@angular/core";
import { CAFormControlComponentAbstract } from "../../abstracts/ca-form-control-component.abstract";

@Component({
  selector: 'test-ca-form-control',
  template: ''
})
export class TestCAFormControlComponentAbstractUtil extends CAFormControlComponentAbstract
{
  public click()
  {
    this.submitClicked.emit();
  }
}
