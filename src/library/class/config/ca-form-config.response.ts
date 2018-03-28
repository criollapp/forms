import { CAResponseAbstract } from "@criollapp/common";
import { CAFormConfig } from "./ca-form-config.class";

export class CAFormConfigResponse extends CAResponseAbstract
{
  public data:CAFormConfig;

  constructor()
  {
    super();

    this.data = new CAFormConfig();
  }
}
