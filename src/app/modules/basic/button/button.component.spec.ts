import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should verify the creation of Buttoncomponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have blocx-button-primary class',()=>{
    component.variant="primary";
    fixture.detectChanges();
    let actual='blocx-button blocx-button-primary';
    expect(component._elementRef.nativeElement.classList.value).toContain(actual);
  });

  it('should have blocx-button-success class',()=>{
    component.variant="success";
    fixture.detectChanges();
    let actual='blocx-button blocx-button-success';
    expect(component._elementRef.nativeElement.classList.value).toContain(actual);
  });

  it('should have blocx-button-danger class',()=>{
    component.variant="danger";
    fixture.detectChanges();
    let actual='blocx-button blocx-button-danger';
    expect(component._elementRef.nativeElement.classList.value).toContain(actual);
  });

  it('should have blocx-button-secondary class',()=>{
    component.variant="secondary";
    fixture.detectChanges();
    let actual='blocx-button blocx-button-secondary';
    expect(component._elementRef.nativeElement.classList.value).toContain(actual);
  });

  it('should have blocx-button-outline-primary class',()=>{
    component.variant="outline-primary";
    fixture.detectChanges();
    let actual='blocx-button blocx-button-outline-primary';
    expect(component._elementRef.nativeElement.classList.value).toContain(actual);
  });

  it('should have blocx-button-outline-success class',()=>{
    component.variant="outline-success";
    fixture.detectChanges();
    let actual='blocx-button blocx-button-outline-success';
    expect(component._elementRef.nativeElement.classList.value).toContain(actual);
  });

  it('should have blocx-button-outline-danger class',()=>{
    component.variant="outline-danger";
    fixture.detectChanges();
    let actual='blocx-button blocx-button-outline-danger';
    expect(component._elementRef.nativeElement.classList.value).toContain(actual);
  });
  
  it('should have blocx-button-outline-secondary class',()=>{
    component.variant="outline-secondary";
    fixture.detectChanges();
    let actual='blocx-button blocx-button-outline-secondary';
    expect(component._elementRef.nativeElement.classList.value).toContain(actual);
  });

  it('should have blocx-button-outline-secondary class',()=>{
    component.variant="";
    fixture.detectChanges();
    let actual='blocx-button';
    expect(component._elementRef.nativeElement.classList.value).toContain(actual);
  });
  
  afterEach(() => {
    fixture.destroy();
  });
});
