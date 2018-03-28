import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CAFormsModule} from '../modules/ca-forms.module';
import { CAFormAbstract } from "../abstracts/ca-form.abstract";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { CAFormComponent } from "../components/form/ca-form.component";

describe('CAFormAbstract', () => {
  let de: DebugElement;
  let component: CAFormComponent;
  let fixture: ComponentFixture<CAFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CAFormsModule],
      declarations: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CAFormComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('ca-form-control'));
    fixture.detectChanges();
  });

  it('has ca-form-control tag',()=>{
    const formTag = de.nativeElement;

    expect(formTag != null ).toBeTruthy();
  });

  it('frameworkName is set on ca-form-control',()=>{
    expect( de.attributes['ng-reflect-framework-name'] != null ).toBeTruthy();
    expect( de.attributes['ng-reflect-ca-form-control'] != null ).toBeTruthy();
  });

  it('listeners are set on ca-form-control',()=>{
    expect( de.listeners[0].name == 'caFormControlChange' ).toBeTruthy();
    expect( de.listeners[1].name == 'submitClicked' ).toBeTruthy();
  });

});
