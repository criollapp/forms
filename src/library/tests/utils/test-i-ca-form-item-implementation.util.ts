import { ICAFormItem } from "../../interfaces/i-ca-form-item.interface";

export class TestICAFormItemImplementation implements ICAFormItem
{
  public key:string;
  public type:string;
  public objectClass:Object;

  constructor()
  {
    this.key = '';
    this.type = '';
    this.objectClass = {};
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
