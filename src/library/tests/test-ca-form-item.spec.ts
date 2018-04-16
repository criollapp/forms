import { TestBed } from "@angular/core/testing";
import { ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { CAFormsModule } from "../modules/ca-forms.module";
import { By } from "@angular/platform-browser";
import { async } from "@angular/core/testing";
import { CAFormItemAbstract } from "../abstracts/ca-form-item.abstract";
import { CAFormItemComponent } from "../components/form-item/ca-form-item.component";

describe('CAFormItemComponent', ()=>{
    let de: DebugElement;
    let component: CAFormItemComponent;
    let fixture: ComponentFixture<CAFormItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CAFormsModule],
            declarations: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CAFormItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('input is visible if is text',()=>{
        component.formItem = CAFormItemAbstract.getInputItem('example');
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('input'));

        expect( de != null ).toBeTruthy();
    });

    it('input is visible if is password',()=>{
        component.formItem = CAFormItemAbstract.getInputItem('example', 'password');
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('input'));

        expect( de != null).toBeTruthy();
    });

    it('input is not visible if subtype is wrong',()=>{
        component.formItem = CAFormItemAbstract.getInputItem('example', 'password27');
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('input'));

        expect( de == null).toBeTruthy();
    });

    it('input has type attr with correct value',()=>{
        component.formItem = CAFormItemAbstract.getInputItem('example', 'password');
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('input'));

        expect( de.properties['type'] == 'password').toBeTruthy();
    });

    it('input has value attr with value on model',()=>{
        component.formItem = CAFormItemAbstract.getInputItem('example');
        component.model = 'hello';
        fixture.detectChanges();

        fixture.whenRenderingDone().then(()=>{
            de = fixture.debugElement.query(By.css('input'));

            expect( de.properties['value'] == "hello").toBeTruthy();
        });
    });

    it('formItem has null value by default',()=>{
        expect(component.formItem).toBeUndefined();
    });

    it('model has empty value by default',()=>{
        expect(component.model).toBe('');
    });

    it('modelChange is emitted when model  change',()=>{
        spyOn(component.modelChange, 'emit');

        component.model = 'hello';

        expect(component.modelChange.emit).toHaveBeenCalled();
    });

});
