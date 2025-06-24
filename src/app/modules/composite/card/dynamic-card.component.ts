import { Component, OnInit, HostBinding ,ViewEncapsulation, Input, SimpleChanges, Renderer2, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { BlocxBaseComponent } from './blocx-base.component'

@Component({
  selector: 'blocx-card',
  templateUrl: './dynamic-card.component.html',
  styleUrls: ['./dynamic-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DynamicCardComponent extends BlocxBaseComponent implements OnInit {
  @HostBinding('class.blocx-card-post-thumnails') get isPostThumbnails() { return this.cardType === 'post-thumbnails' }
  @HostBinding('class.blocx-card-post') get isPost() { return this.cardType === 'post' }
  @HostBinding('class.blocx-card-post-preview') get isPostPreview() { return this.cardType === 'post-preview' }
  @HostBinding('class.blocx-card-image-thumbnail') get isImageThumbnail() { return this.cardType === 'image-thumbnail' }
  @HostBinding('class.blocx-card-post-thumnails-img-middle') get isPostImageThumnailsImageMiddle() { return this.cardType === 'post-thumnails-img-middle' }
  @HostBinding('class.blocx-card-review') get isCardReview() { return this.cardType === 'card-review' }

  figmaCardData: any;
  cardId! : string;
  @ViewChildren('blocxCardElement') blocxCardElement!: QueryList<ElementRef>;
  
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.cardId = this.generateRandomAlphanumeric();
  }

  getAllIds(){
    const elements = this.elementRef.nativeElement.querySelectorAll('.blocx-card');
    const ids = Array.from(elements).map((element: any) => element.id);
    console.log("Card Ids: ", ids);
  }

  generateRandomAlphanumeric() {
    return Math.random().toString(36).substr(2, 5).toUpperCase();
  }

  applyFigmaStyle(figmaData: any){
    if (!figmaData || !this.blocxCardElement || this.blocxCardElement.length === 0) return;
    this.blocxCardElement.forEach(element => {
      console.log("Card Ids: ", element.nativeElement.id);
    });

    let CardElement = document.getElementsByClassName('blocx-card');

    for(let i=0; i<CardElement.length; i++){
      this.renderer.setStyle(CardElement[i], 'background-color', figmaData.backgroundColor);
      this.renderer.setStyle(CardElement[i], 'border-radius', figmaData.borderRadius  + 'px');

      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[3], 'color', figmaData['body'].color);
      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[3], 'font-size', figmaData['body'].style.fontSize + 'px');
      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[3], 'font-weight', figmaData['body'].style.fontWeight);
      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[3], 'font-family', figmaData['body'].style.fontFamily);

      if (CardElement[i].childNodes[0].nodeName === 'IMG') {
        const imgElement = CardElement[i].childNodes[0] as HTMLImageElement;
        imgElement.src = figmaData['header_image_' + (Number(i) + 1)].style.url;
        imgElement.style.width = '100%';
        //imgElement.style.width = figmaData['header_image_' + (Number(i) + 1)].style.width + 'px';
        imgElement.style.height = figmaData['header_image_' + (Number(i) + 1)].style.height + 'px';
        //imgElement.style.borderRadius = figmaData.borderRadius  + 'px';
      }
      if (CardElement[i].childNodes[1].childNodes[0].nodeName === 'IMG') {
        const imgElement = CardElement[i].childNodes[1].childNodes[0] as HTMLImageElement;
        imgElement.src = figmaData['user_img_container'].style.url;
      }

      this.renderer.setStyle(CardElement[i].childNodes[1].childNodes[1].childNodes[0], 'color', figmaData['title'].color);
      this.renderer.setStyle(CardElement[i].childNodes[1].childNodes[1].childNodes[0], 'font-size', figmaData['title'].style.fstyle.fontSize + 'px');
      this.renderer.setStyle(CardElement[i].childNodes[1].childNodes[1].childNodes[0], 'font-weight', figmaData['title'].style.fstyle.fontWeight);
      this.renderer.setStyle(CardElement[i].childNodes[1].childNodes[1].childNodes[0], 'font-family', figmaData['title'].style.fstyle.fontFamily);

      this.renderer.setStyle(CardElement[i].childNodes[1].childNodes[1].childNodes[1], 'color', figmaData['subtitle'].color);
      this.renderer.setStyle(CardElement[i].childNodes[1].childNodes[1].childNodes[1], 'font-size', figmaData['subtitle'].style.fstyle.fontSize + 'px');
      this.renderer.setStyle(CardElement[i].childNodes[1].childNodes[1].childNodes[1], 'font-weight', figmaData['subtitle'].style.fstyle.fontWeight);
      this.renderer.setStyle(CardElement[i].childNodes[1].childNodes[1].childNodes[1], 'font-family', figmaData['subtitle'].style.fstyle.fontFamily);

      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[4], 'background-color', figmaData['read_more_btn'].bgColor);
      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[4], 'color', figmaData['read_more_btn'].color);
      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[4], 'border-color', figmaData['read_more_btn'].borderColor);
      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[4], 'font-size', figmaData['read_more_btn'].style.fontSize + 'px');
      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[4], 'font-weight', figmaData['read_more_btn'].style.fontWeight);
      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[4], 'font-family', figmaData['read_more_btn'].style.fontFamily);

      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[5], 'background-color', figmaData['action_btn'].bgColor);
      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[5], 'color', figmaData['action_btn'].color);
      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[5], 'border-color', figmaData['action_btn'].borderColor);
      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[5], 'font-size', figmaData['action_btn'].style.fontSize + 'px');
      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[5], 'font-weight', figmaData['action_btn'].style.fontWeight);
      this.renderer.setStyle(CardElement[i].childNodes[5].childNodes[5], 'font-family', figmaData['action_btn'].style.fontFamily);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.figmaCardData = JSON.parse(localStorage.formattedFigmaData)['card_container'];
    console.log('Figma Card Data: ', this.figmaCardData);
    if (this.blocxCardElement && this.blocxCardElement.length > 0) {
      this.applyFigmaStyle(this.figmaCardData);
    }
  }

}
