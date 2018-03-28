import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {CAStringResponse, CABooleanResponse, CAModelArrayResponse} from '@criollapp/common';
import {ICALangService,CALang} from '@criollapp/lang';

@Injectable()
export class TestICALangServiceImplementation implements ICALangService
{
  public fakeTranslationObject;

  public _defaultLang:CAStringResponse;
  public _currentLang:CAStringResponse;
  public _booleanResponse:CABooleanResponse;

  constructor()
  {
    this.fakeTranslationObject = TestICALangServiceImplementation.FAKE_VALUE;
    this._booleanResponse = new CABooleanResponse();
    this._booleanResponse.data = true;
    this._defaultLang = new CAStringResponse();
    this._currentLang = new CAStringResponse();
  }

  static get FAKE_VALUE()
  {
    return {
      "es": {
        "FORMS.DEFAULT_FAIL": "Este formulario no tiene una accion implementada."
      },
      "en": {
        "FORMS.DEFAULT_FAIL": "This form does not have an action implemented."
      }
    };
  }

  getDefaultLang(): Observable<CAStringResponse>
  {
    return Observable.of(this._defaultLang);
  }

  setDefaultLang(lang: string): Observable<CABooleanResponse>
  {
    this._defaultLang.data = lang;
    return Observable.of(this._booleanResponse);
  }

  getCurrentLang(): Observable<CAStringResponse>
  {
    return Observable.of(this._currentLang);
  }

  setCurrentLang(lang: string): Observable<CABooleanResponse>
  {
    this._currentLang.data = lang;
    return Observable.of(this._booleanResponse);
  }

  getLangs(): Observable<CAModelArrayResponse>
  {
    let response:CAModelArrayResponse = new CAModelArrayResponse();
    response.data = [ new CALang({name: 'es'}), new CALang({name: 'en'}) ];
    return Observable.of(response);
  }

  getLabel(key, paramsObject?):Observable<string>
  {
    let label = key;
    if( this.fakeTranslationObject[this._currentLang.data].hasOwnProperty(key) )
    {
      label = this.fakeTranslationObject[this._currentLang.data][key];
    }
    return Observable.of(label);
  }
}

