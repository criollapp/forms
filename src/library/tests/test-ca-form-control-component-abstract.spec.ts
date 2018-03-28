import { TestBed } from "@angular/core/testing";
import { CAFormsModule } from "../modules/ca-forms.module";
import { TestCAFormConrolContainerComponent } from "./utils/test--ca-form-control-container-component.util";
import { async } from "@angular/core/testing";
import { ComponentFixture } from "@angular/core/testing";
import { CAFormGroup } from "../class/ca-form-group.class";
import { TestCAFormControlComponentAbstractUtil } from "./utils/test-ca-form-control-abstract.util";
import { CAFormControlAbstract } from "../abstracts/ca-form-control.abstract";
import {CACSSUtil} from '@criollapp/theme';

describe('CAFormControlComponentAbstract',()=>{

  let component: TestCAFormConrolContainerComponent;
  let fixture: ComponentFixture<TestCAFormConrolContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CAFormsModule],
      declarations: [TestCAFormConrolContainerComponent, TestCAFormControlComponentAbstractUtil]
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCAFormConrolContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('caFormControl has caFormControl by default',()=>{
    expect( component.formControl.caFormControl instanceof CAFormGroup ).toBeTruthy();
  });

  it('has @Input caFormControl',()=>{
    expect( component.formControl.caFormControl.route == 'testRoute' ).toBeTruthy();
  });

  it('caFormControl set works',()=>{
    let xControl = new CAFormGroup();
    xControl.route = 'test1';

    component.formControl.caFormControl = xControl;

    expect( component.formControl.caFormControl.route == xControl.route ).toBeTruthy();
  });

  it('caFormControl get works',()=>{
    let xControl = new CAFormGroup();
    xControl.route = 'test1';

    component.formControl.caFormControl = xControl;

    expect( component.formControl.caFormControl.route == xControl.route ).toBeTruthy();
  });

  it('caFormControlChange is emit when is changed',()=>{
    let xControl = new CAFormGroup();
    xControl.route = 'test1';
    spyOn(component, 'formControlChanged');

    component.formControl.caFormControl = xControl;

    fixture.whenStable().then(()=>{
      expect( component.formControlChanged ).toHaveBeenCalled();
    });

  });

  it('submitClicked has Output',()=>{
    spyOn(component, 'submitClicked');

    component.formControl.click();

    expect( component.submitClicked ).toHaveBeenCalled();
  });

  it('titleClass has ca-align-left by default', ()=>{
    expect( component.formControl.titleClass.indexOf('ca-align-left') > - 1 ).toBeTruthy();
  });

  it('titleClass has text-left by default when is bootstrap', ()=>{
    component.formControl.frameworkName = 'bootstrap';

    expect( component.formControl.titleClass.indexOf('text-left') > - 1 ).toBeTruthy();
  });

  it('titleClass have ca-align-right when formControl change to right', ()=>{
    component.formControl.caFormControl.alignTitleTo = CACSSUtil.ALIGN_TO_RIGHT;

    expect( component.formControl.titleClass.indexOf('ca-align-right') > - 1 ).toBeTruthy();
  });

  it('titleClass has text-right by default when is bootstrap and it is align to right', ()=>{
    component.formControl.frameworkName = 'bootstrap';
    component.formControl.caFormControl.alignTitleTo = CACSSUtil.ALIGN_TO_RIGHT;

    expect( component.formControl.titleClass.indexOf('text-right') > - 1 ).toBeTruthy();
  });

  it('titleClass have ca-align-center when formControl change to center', ()=>{
    component.formControl.caFormControl.alignTitleTo = CACSSUtil.ALIGN_TO_CENTER;

    expect( component.formControl.titleClass.indexOf('ca-align-center') > - 1 ).toBeTruthy();
  });

  it('titleClass has text-center by default when is bootstrap and it is align to center', ()=>{
    component.formControl.frameworkName = 'bootstrap';
    component.formControl.caFormControl.alignTitleTo = CACSSUtil.ALIGN_TO_CENTER;

    expect( component.formControl.titleClass.indexOf('text-center') > - 1 ).toBeTruthy();
  });

});
