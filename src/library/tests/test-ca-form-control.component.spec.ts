import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { CAFormControlComponent } from "../components/form-controls/base/ca-form-control.component";
import { CAFormsModule } from "../modules/ca-forms.module";
import { CArrayUtil } from "@criollapp/common";

describe('CAFormControlComponent', () => {
  let de: DebugElement;
  let component: CAFormControlComponent;
  let fixture: ComponentFixture<CAFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CAFormsModule],
      declarations: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CAFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('ca-form-control-generic'));
  });

  it('has ca-form-control-generic tag',()=>{
    const formTag = de.nativeElement;

    expect(formTag != null ).toBeTruthy();
  });

  it('attrs are set on ca-form-control-generic',()=>{
    expect( de.attributes['ng-reflect-framework-name'] != null ).toBeTruthy();
    expect( de.attributes['ng-reflect-ca-form-control'] != null ).toBeTruthy();
  });

  it('listeners are set on ca-form-control-generic',()=>{
    expect( de.listeners[0].name == 'caFormControlChange' ).toBeTruthy();
    expect( de.listeners[1].name == 'submitClicked' ).toBeTruthy();
  });

  it('formItemsClass has default value',()=>{
    expect( CArrayUtil.areEqual( component.formItemsClass, ['ca-form-items'] ) ).toBeTruthy();
  });

  it('formItemsContainerClass has default value',()=>{
    expect( CArrayUtil.areEqual( component.formItemsContainerClass, ['ca-form-items-container'] ) ).toBeTruthy();
  });

  it('submitClass has default value',()=>{
    expect( CArrayUtil.areEqual( component.submitClass, ['ca-form-submit'] ) ).toBeTruthy();
  });

  it('titleClass has default value',()=>{
    expect( CArrayUtil.areEqual( component.titleClass, ['ca-form-title ca-title', 'ca-align-left'] ) ).toBeTruthy();
  });

});
