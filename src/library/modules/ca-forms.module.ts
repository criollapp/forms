import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CAlertComponent } from '@criollapp/components';
import { CAFormComponent } from "../components/form/ca-form.component";
import { CommonModule } from "@angular/common";
import { CAFormControlComponent } from "../components/form-controls/base/ca-form-control.component";
import { CAFormControlGenericComponent } from "../components/form-controls/generic/ca-form-control-generic.component";

@NgModule({
  declarations: [CAFormComponent, CAFormControlGenericComponent, CAFormControlComponent, CAlertComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [FormBuilder],
  exports: [ReactiveFormsModule, FormsModule, CAFormComponent, CAFormControlGenericComponent, CAFormControlComponent ]
})
export class CAFormsModule {
}
