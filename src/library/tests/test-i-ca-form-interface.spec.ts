import { TestICAFormImplementation } from "./utils/test-i-ca-form-implementation.util";
import { ICAForm } from "../interfaces/i-ca-form.interface";
import { EventEmitter } from "@angular/core";
import { CAFormGroup } from "../class/ca-form-group.class";

describe('ICAForm',()=>{
  let form:ICAForm = new TestICAFormImplementation();

  it('has form attr',()=>{
    expect(form.form instanceof CAFormGroup).toBeTruthy();
  });

  it('has beforeAction attr',()=>{
    expect(form.beforeAction instanceof EventEmitter).toBeTruthy();
  });

  it('has action attr',()=>{
    expect(form.action instanceof EventEmitter).toBeTruthy();
  });

  it('has successfulAction attr',()=>{
    expect(form.successfulAction instanceof EventEmitter).toBeTruthy();
  });

  it('has failAction attr',()=>{
    expect(form.failAction instanceof EventEmitter).toBeTruthy();
  });

  it('has endAction attr',()=>{
    expect(form.endAction instanceof EventEmitter).toBeTruthy();
  });

  it('has statusChange attr',()=>{
    expect(form.statusChange instanceof EventEmitter).toBeTruthy();
  });

  it('has modelChange attr',()=>{
    expect(form.modelChange instanceof EventEmitter).toBeTruthy();
  });

  it('has configServiceChange attr',()=>{
    expect(form.configServiceChange instanceof EventEmitter).toBeTruthy();
  });

  it('has builded attr',()=>{
    expect(form.builded instanceof EventEmitter).toBeTruthy();
  });

  it('has buildFailed attr',()=>{
    expect(form.buildFailed instanceof EventEmitter).toBeTruthy();
  });

});
