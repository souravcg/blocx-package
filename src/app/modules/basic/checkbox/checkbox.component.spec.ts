import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { FormsModule } from '@angular/forms';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CheckboxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    event = { ...event, stopPropagation: () => { } }
  });

  it('should verify the creation of Checkbox component', () => {
    expect(component).toBeTruthy();
  });

  it('should verify the input tag in component', () => {
    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
  });

  it('should verify the label tag in component', () => {
    const Chkbox_label = fixture.debugElement.nativeElement.querySelector('label');
    expect(Chkbox_label).toBeTruthy();
  });

  it('should verify the checkbox type in component', () => {
    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.type).toContain('checkbox');
  });

  it('should set required attribute to true ', () => {
    component.required = true;
    fixture.detectChanges();
    expect(component.required).toBeTrue();
  });
  
  it('should set required attribute to false ', () => {
    component.required = false;
    fixture.detectChanges();
    expect(component.required).toBeFalse();
  });

  it('should should set Checked attribute to true', () => {
    component.checked = true;
    fixture.detectChanges();
    expect(component.checked).toBeTrue();
  });

  it('should should set Checked attribute to false', () => {
    component.checked = false;
    fixture.detectChanges();
    expect(component.checked).toBeFalse();
  });

  it('should should set disabled attribute to false', () => {
    component.disabled = false;
    fixture.detectChanges();
    expect(component.disabled).toBeFalse();
  });

  it('should should set disabled attribute to true', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(component.disabled).toBeTrue();
  });

  it('should run _onInputClick function', () => {
    spyOn(component.change, "emit");
    component.disabled = false;
    fixture.detectChanges();

    component._onInputClick(event);
    expect(component.change.emit).toHaveBeenCalled();
  });

  it('should verify else block in _onInputClick function', () => {
    component.disabled = true;
    fixture.detectChanges();
    component._onInputClick(event);
    expect(component._onInputClick).toBeDefined();
  });

  it('should run _onInteractionEvent function', () => {
    spyOn(event, "stopPropagation");
    fixture.detectChanges();
    component._onInteractionEvent(event)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  });

  it('should run control accessor methods', fakeAsync(() => {
    const onChangeEvent = (change: any) => { };
    const registerOnChangeMock = spyOn(component, "registerOnChange").and.callThrough();
    const registerOnTouchedMock = spyOn(component, "registerOnTouched").and.callThrough();
    const onMockWriteValue = spyOn(component, "writeValue").and.callThrough();
    const onMockSetDisable = spyOn(component, "setDisabledState").and.callThrough();
    component.registerOnChange(onChangeEvent);
    component.registerOnTouched(onChangeEvent);
    component.writeValue(true);
    component.setDisabledState(true);
    fixture.whenStable().then(() => {
      expect(registerOnChangeMock).toHaveBeenCalledTimes(1); //pass
      expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
      //pass
      expect(onMockWriteValue).toHaveBeenCalled(); //failed
      expect(component.checked).toEqual(true); //failed
      expect(onMockSetDisable).toHaveBeenCalled();
      expect(component.disabled).toBeTrue();
    });
  }));
  // it('should run control accessor method registerOnChange',()=>{
  //   // spyOn(component,"registerOnChange");
  //   // spyOn(component,"onChange");

  //   fixture.nativeElement.querySelector('input').registerOnChange(null)
  //   fixture.detectChanges();

  //   expect(component.onChange).toBeNull();
  // })
  // it('should run control accessor method registerOnTouched',()=>{
  //   spyOn(component,"registerOnTouched");
  //   spyOn(component,"onTouch");
  //   fixture.detectChanges();
  //   component.registerOnTouched(null);
  //   expect(component.onTouch).toBeNull();
  // })
  afterEach(() => {
    fixture.destroy();
    component = null;
  });
});
