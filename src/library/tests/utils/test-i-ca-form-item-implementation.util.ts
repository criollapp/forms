import { ICAFormItem } from "../../interfaces/i-ca-form-item.interface";

export class TestICAFormItemImplementation implements ICAFormItem
{
  public key:string;
  public label:string;
  public type:string;
  public objectClass:Object;

  constructor()
  {
    this.key = '';
    this.label = '';
    this.type = '';
    this.objectClass = {};
  }

  public isInput():boolean
  {
    return false;
  }

  isGroup():boolean
  {
    return false;
  }

  isControl():boolean
  {
    return false;
  }

  isArray():boolean
  {
    return false;
  }
}
