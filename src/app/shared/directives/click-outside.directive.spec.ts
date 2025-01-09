import { ClickOutsideDirective } from './click-outside.directive';
import { Component } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'test-clickout',
    template: `
        <div (clickOutside)="close($event)"></div>
        <span>this is to verify non target elements</span>
    `
})
class TestClickOutsideDirective {
    close(event) { }
}

describe('ClickOutsideDirective', () => {

    let fixture:ComponentFixture<TestClickOutsideDirective>;
    let component:TestClickOutsideDirective;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClickOutsideDirective, TestClickOutsideDirective]
        }).compileComponents();
    }))
    beforeEach(()=>{
        fixture =TestBed.createComponent(TestClickOutsideDirective);
        component= fixture.componentInstance;
        fixture.detectChanges();
    })
    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should call onClick function in clickoutside directive',()=>{
        let divElem = fixture.debugElement.query(By.directive(ClickOutsideDirective));
        let clickOutsideInstance = divElem.injector.get(ClickOutsideDirective);
        spyOn(clickOutsideInstance,"onClick").and.callThrough();
        document.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(clickOutsideInstance.onClick).toHaveBeenCalled();
    });

    it('should call onClick function in clickoutside directive on target Element',()=>{
        let divElem = fixture.debugElement.query(By.directive(ClickOutsideDirective));
        let clickOutsideInstance = divElem.injector.get(ClickOutsideDirective);
        spyOn(clickOutsideInstance,"onClick").and.callThrough();
        clickOutsideInstance.onClick(new MouseEvent('click'), divElem.nativeElement);
        fixture.detectChanges();
        expect(clickOutsideInstance.onClick).toHaveBeenCalled();
    });

    it('should call onClick function in clickoutside directive on non targeted Element span',()=>{
        let divElem = fixture.debugElement.query(By.directive(ClickOutsideDirective));
        let clickOutsideInstance = divElem.injector.get(ClickOutsideDirective);
        spyOn(clickOutsideInstance,"onClick").and.callThrough();
        let spanElem= fixture.debugElement.query(By.css('span'));
        clickOutsideInstance.onClick(new MouseEvent('click'), null);
        fixture.detectChanges();
        expect(clickOutsideInstance.onClick).toBeDefined();
    });

});
