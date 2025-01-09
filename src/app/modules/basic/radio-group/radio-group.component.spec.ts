import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { RadioGroupComponent } from './radio-group.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('RadioGroupComponent', () => {
  let component: RadioGroupComponent;
  let fixture: ComponentFixture<RadioGroupComponent>;
  let mockItems:any,mockDefaultData:String;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations: [ RadioGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioGroupComponent);
    component = fixture.componentInstance;
    component.onChange=()=>{};
    component.onTouched=()=>{};
    event={...event,stopPropagation:()=>{}}
    
    mockItems = [
      {
        id: "1",
        name: "radioGroupName",
        value: "Angular",
        label: "Angular"
      },
      {
        id: "2",
        name: "radioGroupName",
        value: "React",
        label: "React"
      },
      {
        id: "3",
        name: "radioGroupName",
        value: "LWC",
        label: "LWC"
      }
    ];
    fixture.detectChanges();
  });

  it('should verify the radio-group component', () => {
    expect(component).toBeTruthy();
  });

  it('should verify the input tag in component', () => {
    const radio_input = fixture.nativeElement.querySelector('input');
    expect(radio_input).toBeDefined();
  });

  it('should verify the label tag in component', () => {
    const radiogrp_label = fixture.nativeElement.querySelector('label');
    expect(radiogrp_label).toBeDefined();
  });

  it("should create input element for each items",()=>{
    component.items=mockItems;
    fixture.detectChanges();
    var inputDbEl=fixture.debugElement.queryAll(By.css('input'));
    expect(inputDbEl.length).toEqual(3);
  })

  it('should set name property and get name',()=>{
    component.name="radioGroup";
    fixture.detectChanges();
    expect(component.name).toEqual("radioGroup");
  })

  it("should set value and get value",async(()=>{
    component.value=true;
    let value=component.value;
    fixture.detectChanges();
    expect(value).toBeTrue();
  }));

  it("should set value and get value",async(()=>{
    component.value=undefined;
    let value=component.value;
    fixture.detectChanges();
    expect(value).toBeUndefined();
  }));

  it("should get value",()=>{
    let value=component.value;
    fixture.detectChanges();
    expect(value).toBeUndefined();
  });

  it("should set required attribute and get required",()=>{
    component.required=true;
    fixture.detectChanges();
    expect(component.required).toBeTrue();
  });

  it('should run _onInputClick function',()=>{
    spyOn(component.onRadioButtonClick,"emit");
    fixture.detectChanges();
    
    component._onInputClick(event);
    expect(component.onRadioButtonClick.emit).toHaveBeenCalled();
  });
  
  it('should run onRadioModelChange function',()=>{
    spyOn(component.onRadioModelChange,"emit");
    fixture.detectChanges();
    component._onRadioModelChange("");
    expect(component.onRadioModelChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should run control accessor methods',fakeAsync(()=>{
    const onChangeEvent = (change: any) => { };
    const registerOnChangeMock = spyOn(component, "registerOnChange").and.callThrough();
    const registerOnTouchedMock = spyOn(component, "registerOnTouched").and.callThrough();
    const onMockWriteValue = spyOn(component, "writeValue").and.callThrough();
    component.registerOnChange(onChangeEvent);
    component.registerOnTouched(onChangeEvent);
    component.writeValue(true);
    component.writeValue(component.value);
    fixture.whenStable().then(() => {
      expect(registerOnChangeMock).toHaveBeenCalledTimes(1); 
      expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
      expect(onMockWriteValue).toHaveBeenCalledTimes(2); 
    });
  }));

  it('should stop propagation if event keyCode is "38"', () => {
    const event = { keyCode: "38", stopPropagation: jasmine.createSpy('stopPropagation') };

    component._onInputClick(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });
  afterEach(() => {
    fixture.destroy();
  });

});
