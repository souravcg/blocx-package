import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponent } from './hero.component';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let mockElementRef = {
    nativeElement: { 
      querySelector: jasmine.createSpy('querySelector').and.returnValue(false) 
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      providers: [{ provide: ElementRef, useValue: mockElementRef }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    component.heroSlider = [
      {
        title: "Hero Slide Heading 1",
        subtitle1: "Hero text 1",
        subtitleFirstImg: "../../../../assets/images/blocx-hero_icon-web-default.svg",
        subtitle2: "BEST HERO 1",
        subtitleSecondImg: "../../../../assets/images/blocx-hero_icon-web-default.svg",
        subtitle: "../../../../assets/images/blocx-hero_icon-web-default.svg",
        background: "../../../../assets/images/blocx-heroslider_img-mountains.png",
        id: "0"
      },
      {
        title: "Hero Slide Heading 2",
        subtitle1: "Hero text 2",
        subtitleFirstImg: "../../../../assets/images/blocx-hero_icon-web-default.svg",
        subtitle2: "BEST HERO 2",
        subtitleSecondImg: "../../../../assets/images/blocx-hero_icon-web-default.svg",
        background: "../../../../assets/images/blocx-heroslider_img-mountains.png",
        id: "1"
      },
      {
        title: "Hero Slide Heading 3",
        subtitle1: "Hero text 3",
        subtitleFirstImg: "../../../../assets/images/blocx-hero_icon-web-default.svg",
        subtitle2: "BEST HERO 3",
        subtitleSecondImg: "../../../../assets/images/blocx-hero_icon-web-default.svg",
        background: "../../../../assets/images/blocx-heroslider_img-mountains.png",
        id: "2"
      }
    ]
    fixture.detectChanges();
  });

  it('should verify the creation of Hero component', () => {
    expect(component).toBeTruthy();
  });

  it('should verify the methods in the component', () => {
    expect(component.heroPrevSlide).toBeDefined();
    expect(component.heroNextSlide).toBeDefined();
    expect(component.ngAfterViewChecked).toBeDefined();
  });
  it('should verify the heroPrevSlide method on click', () => {
    const input = fixture.debugElement.nativeElement.querySelector('.blocx-slider_navigation-leftbtn');
    input.click();
    fixture.detectChanges();
    expect(component.heroPrevSlide).toBeDefined();
    input.click();
    fixture.detectChanges();
    expect(component.heroPrevSlide).toBeDefined();
  });
  it('should verify the heroNextSlide method on click', () => {
    const input = fixture.debugElement.nativeElement.querySelector('.blocx-slider_navigation-rightbtn')
    input.click();
    fixture.detectChanges();
    expect(component.heroNextSlide).toBeDefined();
    // image should open on reaching last image 
    input.click();
    fixture.detectChanges();
    input.click();
    fixture.detectChanges();
    input.click();
    fixture.detectChanges();
    expect(component.heroNextSlide).toBeDefined();
  });

  it('Should verify the onSwipe method on swiping right on hero image', () => {
    spyOn(component, 'onSwipe').and.callThrough();
    let divElem = fixture.debugElement.query(By.css('.blocx-slider_body'));
    divElem.triggerEventHandler('swipe', { ...event, deltaX: 100, deltaY: 100 })
    fixture.detectChanges();
    expect(component.onSwipe).toHaveBeenCalledTimes(1);
    expect(component.preSlideIndex).toEqual(2);
  });

  it('Should verify the onSwipe method on swiping neither right nor left', () => {
    component.ngAfterViewChecked();
    spyOn(component, 'onSwipe').and.callThrough();
    let divElem = fixture.debugElement.queryAll(By.css('div'))[1];
    divElem.triggerEventHandler('swipe', { ...event, deltaX: 35, deltaY: 35 })
    fixture.detectChanges();
    expect(component.onSwipe).toHaveBeenCalledTimes(1);
  });

  it('Should verify the onSwipe method on swiping left on hero image', () => {
    spyOn(component, 'onSwipe').and.callThrough();
    let divElem = fixture.debugElement.query(By.css('.blocx-slider_body'));
    divElem.triggerEventHandler('swipe', { ...event, deltaX: -100, deltaY: -100 })
    fixture.detectChanges();
    expect(component.onSwipe).toHaveBeenCalledTimes(1);
    expect(component.nextSlideIndex).toEqual(1);
  });

  it('should verify hero element 1st children style left 100%', () => {
    const input = fixture.debugElement.nativeElement.querySelector('.blocx-slider_navigation-rightbtn')
    input.click();
    fixture.detectChanges();
    expect(component.heroNextSlide).toBeDefined();
    let imgDebugELems = fixture.debugElement.queryAll(By.css('.blocx-slider_block'));
    expect(imgDebugELems[1].nativeElement.style.left).toEqual('100%');
  })

  it('should verify the onPressLeft method on tap left button', () => {
    spyOn(component, 'onPressLeft').and.callThrough();
    const input = fixture.debugElement.nativeElement.querySelector('.blocx-slider_navigation-leftbtn');
    input.dispatchEvent(new Event('press'));
    fixture.detectChanges();
    expect(component.onPressLeft).toHaveBeenCalled();
  });

  it('should verify the onPressRight method on tap right button', () => {
    spyOn(component, 'onPressRight').and.callThrough();
    const input = fixture.debugElement.nativeElement.querySelector('.blocx-slider_navigation-rightbtn');
    input.dispatchEvent(new Event('press'));
    fixture.detectChanges();
    expect(component.onPressRight).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
