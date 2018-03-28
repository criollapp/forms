import {CAClassAbstract} from '@criollapp/common';
import { CAFormConfigItem } from "./ca-form-config-item.class";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

export class CAFormConfig extends CAClassAbstract {
  public key:string;
  public lang:string;
  public items:CAFormConfigItem[];

  private _labels:Object;

  constructor()
  {
    super();

    CAFormConfig.getDefaults(this);
  }

  public labels( key:string ):Observable<string>
  {
    return Observable.of( this._labels[this.lang][key] );
  }

  public setLabels(labels:Object)
  {
    this._labels = labels;
  }

  public static getDefaults( config:CAFormConfig )
  {
    config.items = [];
    config.key = '';
    config._labels = {
      'es': {
        'FORMS.DEFAULT_FAIL': 'Este formulario no tiene una accion implementada',
        'FORMS.SUBMIT_TEXT': 'Enviar'
      },
      'en': {
        "FORMS.DEFAULT_FAIL": 'This form does not have an action implemented.',
        'FORMS.SUBMIT_TEXT': 'Send'
      }
    };
    config.lang = 'en';
    return config;
  }
}
