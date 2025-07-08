import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTabComponent } from './dynamic-tab.component';
import { Component, OnInit, QueryList, ContentChild, ViewChildren } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DynamicTabsDirective } from './dynamic-tabs.directive';
import { DynamicTabsComponent } from './dynamic-tabs.component';

@Component({
  selector:'',
  template:`
  <blocx-tabs>
    <blocx-dynamic-tab [tabTitle]="'People'">
      <h3>People</h3>
    </blocx-dynamic-tab>
    <blocx-dynamic-tab [tabTitle]="'Chart'">
      <h3>Chart</h3>
    </blocx-dynamic-tab>
    <blocx-dynamic-tab [tabTitle]="'Product Listing'">
      <h3>Product Listing</h3>
    </blocx-dynamic-tab>
  </blocx-tabs>
  `
})
class DynamicTabStub implements OnInit{

  @ViewChildren(DynamicTabComponent) tabs:QueryList<DynamicTabComponent>;
  constructor(){}
  ngOnInit(){}
}

describe('DynamicTabComponent', () => {
  let component: DynamicTabComponent;
  let fixture: ComponentFixture<DynamicTabComponent>;
  let stubComponent: DynamicTabStub;
  let stubFixture: ComponentFixture<DynamicTabStub>;
  let tabsComponent: DynamicTabsComponent;
  let tabsFixture: ComponentFixture<DynamicTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DynamicTabComponent,
        DynamicTabStub,
        DynamicTabsDirective,
        DynamicTabsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTabComponent);
    component = fixture.componentInstance;
    
    stubFixture = TestBed.createComponent(DynamicTabStub);
    stubComponent = stubFixture.componentInstance;

    tabsFixture = TestBed.createComponent(DynamicTabsComponent);
    tabsComponent = tabsFixture.componentInstance;
    
    fixture.detectChanges();
    stubFixture.detectChanges();
    tabsFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set 3 title values in dynamic component stub',()=>{
    stubFixture.detectChanges();
    let dtcElem = stubFixture.debugElement.queryAll(By.directive(DynamicTabComponent));
    stubFixture.detectChanges();
    expect(dtcElem.length).toEqual(3);
  });

  it('should verify 3 titles are rendered in dom',()=>{
    stubFixture.detectChanges();
    let dtcElem = stubFixture.debugElement.queryAll(By.directive(DynamicTabComponent));
    let arr = ['People', 'Chart', 'Product Listing'];
    stubFixture.detectChanges();
    for(let i=0;i<dtcElem.length;i++){
      expect(dtcElem[i].componentInstance.title).toEqual(arr[i]);
      expect(dtcElem[i].nativeElement.textContent).toEqual(arr[i]);
    }
  });

  it('should verify selectTab method in tabs',()=>{
    spyOn(tabsComponent,'selectTab').and.callThrough();
    tabsComponent.tabs=stubComponent.tabs;
    tabsFixture.detectChanges();
    let liElem = tabsFixture.debugElement.queryAll(By.css('li'));
    expect(liElem.length).toEqual(3);
    liElem[2].nativeElement.dispatchEvent(new Event('click'));
    tabsFixture.detectChanges();
    expect(tabsComponent.selectTab).toHaveBeenCalledTimes(1);
  });

  it('should call onTap method',()=>{
    spyOn(tabsComponent,'onTap').and.callThrough();
    tabsComponent.tabs=stubComponent.tabs;
    tabsFixture.detectChanges();
    let liElem = tabsFixture.debugElement.queryAll(By.css('li'));
    liElem[2].nativeElement.dispatchEvent(new Event('tap'));
    tabsFixture.detectChanges();
    expect(tabsComponent.onTap).toHaveBeenCalledTimes(1);
  })

});
