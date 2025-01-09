import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports:[RouterTestingModule],
        declarations: [ BreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    component.breadcrumbChild = [
        { name: 'Register', class: '' },
        { name: 'General Information', class: '' },
        { name: 'Payment Information', class: 'active' }
    ];
    fixture.detectChanges();
  });

  it('should verify the creation of Breadcrumb component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should verify the breadcrumbClick eventemitter in onBlocxBreadcrumbClick method', () => {
    spyOn(component.breadcrumbClick,'emit')
    component.onBlocxBreadcrumbClick(event);
    expect(component.breadcrumbClick.emit).toHaveBeenCalled();
  });

  it('should have 3 list elements in HTML and set active class to 3rd element',()=>{
    let liElem = fixture.debugElement.queryAll(By.css('li'));
    expect(liElem.length).toEqual(3);
    expect(liElem[2].nativeElement.classList[1]).toContain('active')
  })

  afterEach(() => {
    fixture.destroy();
  });
});