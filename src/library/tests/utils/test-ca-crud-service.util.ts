import { Injectable } from '@angular/core';
import { ICACrudService, ICAModel, CAModelResponse } from "@criollapp/common";

@Injectable()
export class TestCrudService implements ICACrudService
{
    fail:boolean = false;

    save(model: ICAModel):Promise<CAModelResponse>
    {
      if(this.fail) {
        return Promise.reject(new CAModelResponse());
      } else {
        return Promise.resolve(new CAModelResponse());
      }
    }
}
