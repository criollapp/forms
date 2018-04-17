import { CAFormControlGenericComponent } from "../components/form-controls/generic/ca-form-control-generic.component";
import { TestBed } from "@angular/core/testing";
import { ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { CAFormsModule } from "../modules/ca-forms.module";
import { By } from "@angular/platform-browser";
import { async } from "@angular/core/testing";
import { CArrayUtil, CAlertClass } from '@criollapp/common';
import {CACSSUtil} from '@criollapp/theme';
import { CAFormControlAbstract } from "../abstracts/ca-form-control.abstract";
import { CAFormItem } from "../class/ca-form-item.class";
import { CAFormItemAbstract } from "../abstracts/ca-form-item.abstract";
import { tick } from "@angular/core/testing";
import { fakeAsync } from "@angular/core/testing";

describe('CAFormControlGenericComponent', ()=>{
    let de: DebugElement;
    let component: CAFormControlGenericComponent;
    let fixture: ComponentFixture<CAFormControlGenericComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CAFormsModule],
            declarations: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CAFormControlGenericComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('h2 is null when title is not set',()=>{
        de = fixture.debugElement.query(By.css('h2'));

        expect( de == undefined ).toBeTruthy();
    });

    it('h2 has title when title is set',()=>{
        component.caFormControl.titleControl = 'My Form';

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('h2'));
        expect( de.nativeElement.innerText == 'My Form' ).toBeTruthy();
        expect( de.classes['ca-form-title']).toBeTruthy();
        expect( de.classes['ca-title']).toBeTruthy();
        expect( de.classes['ca-align-left']).toBeTruthy();
    });

    it('form has correct attrs',()=>{
        de = fixture.debugElement.query(By.css('.ca-form'));

        expect( de.attributes['ng-reflect-form'] != undefined ).toBeTruthy();
        expect( de.classes['ca-form']).toBeTruthy();
    });

    it('formItemsContainerClass has default values',()=>{
        expect( CArrayUtil.areEqual( component.formItemsContainerClass, ['ca-form-items-container'] ) ).toBeTruthy();
    });

    it('formItemsContainerClass div has ca-form-items-container class',()=>{
        de = fixture.debugElement.query(By.css('.ca-form-items-container'));

        expect( de != undefined ).toBeTruthy();
    });

    it('ngAfterViewInit add bootstrap classes if is bootstrap',()=>{
        component.frameworkName = 'bootstrap';

        component.ngAfterViewInit();

        expect( component.formItemsClass.indexOf('form-group') > - 1 ).toBeTruthy();
        expect( component.submitClass.indexOf('btn btn-primary') > - 1 ).toBeTruthy();
    });

    it('div for alerts top has frameworkName of container',()=>{
        component.caFormControl.displayAlertOn = [ CAFormControlAbstract.DISPLAY_ALERTS_ON_TOP_FORM ];
        component.frameworkName = 'material';
        component.caFormControl.addErrorAlert('example', 'Example');
        component.caFormControl.addErrorAlert('example2', 'Example 2');
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-alerts-top'));

        expect( de.children[0].componentInstance.frameworkName == 'material').toBeTruthy();
    });

    it('div for alerts top has correct classes',()=>{
        component.caFormControl.displayAlertOn = [ CAFormControlAbstract.DISPLAY_ALERTS_ON_TOP_FORM ];
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-alerts-top'));

        expect( de.classes['ca-form-alerts'] && de.classes['ca-form-alerts-top']).toBeTruthy();
    });

    it('div for alerts top is available when displayAlertOnTop is true',()=>{
        component.caFormControl.displayAlertOn = [ CAFormControlAbstract.DISPLAY_ALERTS_ON_TOP_FORM ];

        fixture.detectChanges();

        fixture.whenStable().then(()=>{
            de = fixture.debugElement.query(By.css('.ca-form-alerts-top'));

            expect( de != undefined ).toBeTruthy();
        });
    });

    it('div for alerts bottom has frameworkName of container',()=>{
        component.frameworkName = 'material';
        component.caFormControl.addErrorAlert('example', 'Example');
        component.caFormControl.addErrorAlert('example2', 'Example 2');
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-alerts-bottom'));

        expect( de.children[0].componentInstance.frameworkName == 'material').toBeTruthy();
    });

    it('div for alerts bottom has correct classes',()=>{
        de = fixture.debugElement.query(By.css('.ca-form-alerts-bottom'));

        expect( de.classes['ca-form-alerts'] && de.classes['ca-form-alerts-bottom']).toBeTruthy();
    });

    it('div for button bottom has correct classes',()=>{
        de = fixture.debugElement.query(By.css('.ca-form-submit-bottom'));

        expect( de.classes['ca-submit']).toBeTruthy();
        expect( de.classes['ca-form-submit']).toBeTruthy();
        expect( de.classes['ca-form-submit-bottom']).toBeTruthy();
        expect( de.classes['ca-button']).toBeTruthy();
    });

    it('div for alerts bottom is available when displayAlertOnBottom is true',()=>{
        de = fixture.debugElement.query(By.css('.ca-form-alerts-bottom'));

        expect( de != undefined ).toBeTruthy();
    });

    it('div for submit bottom is available when displaySubmitOnBottom is true',()=>{
        de = fixture.debugElement.query(By.css('.ca-form-submit-bottom'));

        expect( de != undefined ).toBeTruthy();
    });

    it('div for submit bottom is not available when displaySubmitOnBottom is false',()=>{
        component.caFormControl.displaySubmitOn[0] = CAFormControlAbstract.DISPLAY_SUBMIT_ON_TOP;

        fixture.detectChanges();

        fixture.whenStable().then(()=>{
            de = fixture.debugElement.query(By.css('.ca-form-submit-bottom'));

            expect( de == undefined ).toBeTruthy();
        });
    });

    it('div for submit top is not available when displaySubmitOntop is false',()=>{
        de = fixture.debugElement.query(By.css('.ca-form-submit-top'));

        expect( de == undefined ).toBeTruthy();
    });

    it('div for submit top is available when displaySubmitOnTop is true',()=>{
        component.caFormControl.displaySubmitOn[0] = CAFormControlAbstract.DISPLAY_SUBMIT_ON_TOP;

        fixture.detectChanges();

        fixture.whenStable().then(()=>{
            de = fixture.debugElement.query(By.css('.ca-form-submit-top'));

            expect( de != undefined ).toBeTruthy();
        });
    });

    it('iteration for items is not visible if itemsAreGroup is true',()=>{
        let item = new CAFormItem();
        item.type = CAFormItemAbstract.TYPE_FORM_GROUP;
        component.formItemsContainerClass.push('ca-form-items-container_2');
        component.caFormControl.addItem(item);

        fixture.whenStable().then(()=>{
            de = fixture.debugElement.query(By.css('.ca-form-items-container_2'));

            expect( de == undefined ).toBeTruthy();
        });
    });

    it('iteration for items is visible if itemsAreGroup is false',()=>{
        de = fixture.debugElement.query(By.css('.ca-form-items-container'));

        expect( de != undefined ).toBeTruthy();
    });

    it('div for alerts on bottom has alerts when it have alert',()=>{
        component.caFormControl.addErrorAlert('example', 'Example');
        component.caFormControl.addErrorAlert('example2', 'Example 2');

        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-alerts-bottom'));
        expect( de.children.length == 2 ).toBeTruthy();
    });

    it('div for alerts on top has alerts when it have alert',()=>{
        component.caFormControl.displayAlertOn.push(CAFormControlAbstract.DISPLAY_ALERTS_ON_TOP_FORM);
        component.caFormControl.addErrorAlert('example', 'Example');
        component.caFormControl.addErrorAlert('example2', 'Example 2');

        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-alerts-top'));
        expect( de.children.length == 2 ).toBeTruthy();
    });

    it('div for alerts on bottom is visible if displayAlertOnBottom is true',()=>{
        de = fixture.debugElement.query(By.css('.ca-form-alerts-bottom'));
        expect( de != undefined ).toBeTruthy();
    });

    it('div for alerts on top is visible if displayAlertOnTop is true',()=>{
        component.caFormControl.displayAlertOn.push(CAFormControlAbstract.DISPLAY_ALERTS_ON_TOP_FORM);

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.ca-form-alerts-top'));
        expect( de != undefined ).toBeTruthy();
    });

    it('div for alerts on bottom is not visible if displayAlertOnBottom is false',()=>{
        component.caFormControl.displayAlertOn = [];

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.ca-form-alerts-bottom'));
        expect( de == undefined ).toBeTruthy();
    });

    it('div for alerts on top is not visible if displayAlertOnTop is false',()=>{
        de = fixture.debugElement.query(By.css('.ca-form-alerts-top'));
        expect( de == undefined ).toBeTruthy();
    });

    it('div for alerts on bottom has correct classes',()=>{
        de = fixture.debugElement.query(By.css('.ca-form-alerts-bottom'));
        expect( de.classes['ca-form-alerts-bottom'] ).toBeTruthy();
        expect( de.classes['ca-form-alerts'] ).toBeTruthy();
    });

    it('div for alerts on top has correct classes',()=>{
        component.caFormControl.displayAlertOn.push(CAFormControlAbstract.DISPLAY_ALERTS_ON_TOP_FORM);

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.ca-form-alerts-top'));
        expect( de.classes['ca-form-alerts-top'] ).toBeTruthy();
        expect( de.classes['ca-form-alerts'] ).toBeTruthy();
    });

    it('button of submit on top has correct type',()=>{
        component.caFormControl.displaySubmitOn[0] = CAFormControlAbstract.DISPLAY_SUBMIT_ON_TOP;

        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-submit-top'));
        expect( de.children[0].attributes['type'] == 'submit' ).toBeTruthy();
    });

    it('button of submit on bottom has correct type',()=>{
        de = fixture.debugElement.query(By.css('.ca-form-submit-bottom'));
        expect( de.children[0].attributes['type'] == 'submit' ).toBeTruthy();
    });

    it('button of submit on top has correct classes',()=>{
        component.caFormControl.displaySubmitOn[0] = CAFormControlAbstract.DISPLAY_SUBMIT_ON_TOP;

        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-submit-top'));
        expect( de.children[0].classes[CACSSUtil.CLASS_CA_FORM_SUBMIT] ).toBeTruthy();
    });

    it('button of submit on bottom has correct classes',()=>{
        de = fixture.debugElement.query(By.css('.ca-form-submit-bottom'));
        expect( de.children[0].classes[CACSSUtil.CLASS_CA_FORM_SUBMIT] ).toBeTruthy();
    });

    it('button of submit on top has correct text included',()=>{
        component.caFormControl.submitText = 'Send';
        component.caFormControl.displaySubmitOn[0] = CAFormControlAbstract.DISPLAY_SUBMIT_ON_TOP;

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.ca-form-submit-top'));
        expect( de.children[0].nativeElement.innerHTML == 'Send' ).toBeTruthy();
    });

    it('button of submit on bottom has correct text included',()=>{
        component.caFormControl.submitText = 'Send';
        de = fixture.debugElement.query(By.css('.ca-form-submit-bottom'));

        fixture.detectChanges();
        expect( de.children[0].nativeElement.innerHTML == 'Send' ).toBeTruthy();
    });

    it('div for alerts on top has alert instance',()=>{
        component.caFormControl.displayAlertOn.push(CAFormControlAbstract.DISPLAY_ALERTS_ON_TOP_FORM);
        component.caFormControl.addErrorAlert('example', 'Example');
        component.caFormControl.addErrorAlert('example2', 'Example 2');

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.ca-form-alerts-top'));
        expect( de.children[1].componentInstance.alert.message == 'Example 2' ).toBeTruthy();
    });

    it('div for alerts on bottom has alert instance',()=>{
        component.caFormControl.addErrorAlert('example', 'Example');
        component.caFormControl.addErrorAlert('example2', 'Example 2');

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.ca-form-alerts-bottom'));
        expect( de.children[1].componentInstance.alert.message == 'Example 2' ).toBeTruthy();
    });

    it('div for alerts on top remove alert when it close',fakeAsync(()=>{
        component.caFormControl.displayAlertOn.push(CAFormControlAbstract.DISPLAY_ALERTS_ON_TOP_FORM);
        component.caFormControl.addErrorAlert('example', 'Example');
        component.caFormControl.addErrorAlert('example2', 'Example 2');
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.ca-form-alerts-top'));

        de.children[0].children[0].children[0].nativeElement.click();

        tick();
        fixture.detectChanges();
        expect( de.children.length ).toBe(1);
    }));

    it('div for alerts on bottom remove alert when it close',fakeAsync(()=>{
        component.caFormControl.addErrorAlert('example', 'Example');
        component.caFormControl.addErrorAlert('example2', 'Example 2');
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.ca-form-alerts-bottom'));

        de.children[0].children[0].children[0].nativeElement.click();

        tick();
        fixture.detectChanges();
        expect( de.children.length ).toBe(1);
    }));

    it('group div has correct classes',()=>{
        de = fixture.debugElement.query(By.css('.'+CACSSUtil.CLASS_CA_FORM_ITEMS_CONTAINER));

        expect( de.classes[CACSSUtil.CLASS_CA_FORM_ITEMS_CONTAINER] ).toBeTruthy();
    });

    it('input is visible if is text',()=>{
        component.caFormControl.addItem(CAFormItemAbstract.getInputItem('example'));
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-items'));

        expect( de.children[1].name == 'input').toBeTruthy();
    });

    it('input is visible if is password',()=>{
        component.caFormControl.addItem(CAFormItemAbstract.getInputItem('example', 'password'));
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-items'));

        expect( de.children[1].name == 'input').toBeTruthy();
    });

    it('input is not visible if subtype is wrong',()=>{
        component.caFormControl.addItem(CAFormItemAbstract.getInputItem('example', 'password27'));
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-items'));

        expect( de.children.length == 1).toBeTruthy();
    });

    it('inputs on loop has formControlName attr',()=>{
        component.caFormControl.addItem(CAFormItemAbstract.getInputItem('example'));
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-items'));

        expect( de.children[1].attributes['ng-reflect-name'] == 'example').toBeTruthy();
    });

    it('inputs on loop has type attr with correct value',()=>{
        component.caFormControl.addItem(CAFormItemAbstract.getInputItem('example', 'password'));
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-items'));

        expect( de.children[1].properties['type'] == 'password').toBeTruthy();
    });

    it('inputs on loop has value attr with value on model',()=>{
        component.caFormControl.model = {example: 'hello'};
        component.caFormControl.addItem(CAFormItemAbstract.getInputItem('example'));
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-items'));

        expect( de.children[1].properties['value'] == 'hello').toBeTruthy();
    });

    it('labels on loop has for attr',()=>{
        component.caFormControl.addItem(CAFormItemAbstract.getInputItem('example'));
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-items'));

        expect( de.children[0].properties['htmlFor'] == 'example').toBeTruthy();
    });

    it('labels on loop has value on content',()=>{
        component.caFormControl.addItem(CAFormItemAbstract.getInputItem('example'));
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-items'));

        expect( de.children[0].nativeElement.innerHTML == 'EXAMPLE').toBeTruthy();
    });

    it('inputs on loop has id value',()=>{
        component.caFormControl.addItem(CAFormItemAbstract.getInputItem('example'));
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-items'));

        expect( de.children[1].properties['id'] == 'example').toBeTruthy();
    });

    it('inputs on loop not has small tag if singleTip is null',()=>{
        component.caFormControl.addItem(CAFormItemAbstract.getInputItem('example'));
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-items'));

        expect( de.children.length == 2).toBeTruthy();
    });

    it('items on loop has small tag if singleTip is not null',()=>{
        component.caFormControl.addItem(CAFormItemAbstract.getInputItem('example'));
        component.caFormControl.items[0].xControl.alerts.push(new CAlertClass());
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-items'));

        expect( de.children[2].name == 'small').toBeTruthy();
    });

    it('items on loop has small tag if singleTip is not null and content is correct',()=>{
        component.caFormControl.addItem(CAFormItemAbstract.getInputItem('example'));
        component.caFormControl.items[0].xControl.alerts.push(new CAlertClass('MSJ'));
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.ca-form-items'));

        expect( de.children[2].nativeElement.innerHTML).toBe('MSJ');
    });

});
