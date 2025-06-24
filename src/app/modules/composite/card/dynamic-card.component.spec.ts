import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCardComponent } from './dynamic-card.component';
import { OnInit, Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'card-stub',
  template: `
  <blocx-card [cardType]="cardType" style="width: 360px;float: left;">
    <img card-image class="blocx-card_img-top" src="../../../assets/images/blocx-card_img-postthumbnail.png"
      alt="Card image caption">
    <ng-container body-text>
      <h5 class="blocx-card_title">Card Header</h5>
      <p class="blocx-card_text">Some quick example text to build on the card title and make up the bulk of the
        card's
        content.</p>
      <img card-image class="blocx-card_img-top" src="../../../assets/images/blocx-card_img-postthumbnail.png"
        alt="Card image caption">
    </ng-container>
    <ng-container body-links>
      <span> <i class="fa fa-heart" aria-hidden="true"></i>609</span>
      <span> <i class="fa fa-minus-square" aria-hidden="true"></i>120</span>
      <a class="share-link" href="#">share</a>
    </ng-container>
  </blocx-card>
  `
})
class CardStub implements OnInit {
  cardType:String='';
  constructor(){}
  ngOnInit() { }
}

describe('DynamicCardComponent', () => {
  let component: CardStub;
  let fixture: ComponentFixture<CardStub>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicCardComponent,
        CardStub
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardStub);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set blocx-card class to blocx-card-post-thumnails on setting post-thumbnails ',()=>{
      component.cardType = 'post-thumbnails';
      fixture.detectChanges();
      let cardComponent = fixture.debugElement.query(By.directive(DynamicCardComponent));
      let divElem = cardComponent.nativeElement.classList;
      expect(divElem.value).toEqual('blocx-card-post-thumnails');
  });

  it('should set blocx-card class to blocx-card-post-thumnails on setting post-thumbnails ',()=>{
    component.cardType = 'post';
    fixture.detectChanges();
    let cardComponent = fixture.debugElement.query(By.directive(DynamicCardComponent));
    let divElem = cardComponent.nativeElement.classList;
    expect(divElem.value).toEqual('blocx-card-post'); 
  });

  it('should set blocx-card class to blocx-card-post-thumnails on setting post-thumbnails ',()=>{
    component.cardType = 'image-thumbnail';
    fixture.detectChanges();
    let cardComponent = fixture.debugElement.query(By.directive(DynamicCardComponent));
    let divElem = cardComponent.nativeElement.classList;
    expect(divElem.value).toEqual('blocx-card-image-thumbnail');
});

it('should set blocx-card class to blocx-card-post-thumnails on setting post-thumbnails ',()=>{
  component.cardType = 'post-preview';
  fixture.detectChanges();
  let cardComponent = fixture.debugElement.query(By.directive(DynamicCardComponent));
  let divElem = cardComponent.nativeElement.classList;
  expect(divElem.value).toEqual('blocx-card-post-preview'); 
});

it('should set blocx-card class to blocx-card-post-thumnails on setting post-thumbnails ',()=>{
  component.cardType = 'card-review';
  fixture.detectChanges();
  let cardComponent = fixture.debugElement.query(By.directive(DynamicCardComponent));
  let divElem = cardComponent.nativeElement.classList;
  expect(divElem.value).toEqual('blocx-card-review'); 
});

it('should set blocx-card class to blocx-card-post-thumnails on setting post-thumbnails ',()=>{
  component.cardType = 'post-thumnails-img-middle';
  fixture.detectChanges();
  let cardComponent = fixture.debugElement.query(By.directive(DynamicCardComponent));
  let divElem = cardComponent.nativeElement.classList;
  expect(divElem.value).toEqual('blocx-card-post-thumnails-img-middle'); 
});

});
