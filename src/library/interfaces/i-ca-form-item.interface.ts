import { ICAFormControl } from "./i-ca-form-control.interface";

export interface ICAFormItem
{
  key:string;
  type:string;
  objectClass:Object;
  xControl?:ICAFormControl;
  isInput():boolean;
  isGroup():boolean;
  isControl():boolean;
  isArray():boolean;
}
