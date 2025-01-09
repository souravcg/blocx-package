import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldComponent } from './form-field.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlocxLabelDirective } from './blocx-label.directive';
import { InputModule } from 'src/app/modules/basic/input/input.module';
import { BlocxErrorDirective } from './blocx-error.directive';

@Component({
  selector:'blocx-form-field-stub',
  template:`
    <form [formGroup]="demoForm">
    <blocx-form-field hideRequiredMarker="true">
      <blocx-label>Input Label </blocx-label>
      <input
        blocxInput
        type="text"
        id="demoId"
        name="demoName"
        placeholder="Input Placeholder"
        formControlName="demo"
        required
        [class.blocx-element-error]="
          demoForm.get('demo').invalid && demoForm.get('demo').touched
        "
      />
      <blocx-error
        class="blocx-msg-error"
        [class.d-none]="
          demoForm.get('demo').valid || demoForm.get('demo').untouched
        "
      >
     Name is required
      </blocx-error>
    </blocx-form-field>
  </form>
  `
})
class FormFieldComponentStub implements OnInit{
  demoForm = this.fb.group(
        {demo:['', Validators.required]}
      ) ;
  constructor(private fb:FormBuilder){}
  ngOnInit(){}
}

describe('FormFieldComponent', () => {
  let component: FormFieldComponentStub;
  let fixture: ComponentFixture<FormFieldComponentStub>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldComponent, FormFieldComponentStub, BlocxLabelDirective, BlocxErrorDirective ],
      imports:[InputModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldComponentStub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
