import {
  Component,
  OnInit,
  ElementRef,
  ViewEncapsulation,
  Input,
  ViewChild,
  AfterViewChecked,
  SimpleChanges,
  Renderer2
} from "@angular/core";
import {
  Indicator,
  IndicatorAnimations
} from "../../../shared/indicator/indicator";

@Component({
  selector: "blocx-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: IndicatorAnimations
})
export class HeroComponent implements OnInit, AfterViewChecked {
  eventText = "";
  heroNextTimeValue: any;
  heroPrevTimeValue: any;
  indicators;

  currentSlideIndex: any = 0;
  nextSlideIndex: any;
  preSlideIndex: any;
  hasChecked = false;
  figmaHeroData: any;

  @Input() heroCustomClass!: string;
  @Input() heroSlider: any;
  @Input() heroAutoSlideLeft!: boolean;
  @Input() heroAutoSlideRight!: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.indicators = new Indicator();
  }

  @ViewChild("heroElemRef") heroElemRef!: ElementRef;

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if(!this.hasChecked){
      this.hasChecked = true;

      if (this.elementRef.nativeElement.querySelector(".blocx-slider_block")) {
        this.elementRef.nativeElement.querySelector(
          ".blocx-slider_block"
        ).style.left = "0";
      }
    }
  }

  scrollToSlide(slide_item: any, index: any) {
    console.log(slide_item);
    this.currentSlideIndex = index;
    
    this.heroSlider.forEach((item: any, index: any)=>{
      let elm = this.heroElemRef.nativeElement.querySelector(`#blocx_slider_${item.id}`);

      if(elm){
        if(item.id === slide_item.id){
          elm.style.left = "0";
        } else{
          elm.style.left = "";
        }
      }
    });

    const element = this.heroElemRef.nativeElement.querySelector(`#blocx_slider_${this.heroSlider[this.currentSlideIndex].id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }

    setTimeout(() => {
      if(this.figmaHeroData){
        const allElements = document.querySelectorAll('.blocx-slider_dot');
        const allElementsArray = Array.from(allElements);
        const activeElement = document.querySelectorAll('.blocx-slider_dot.active');
        const inactiveElements = allElementsArray.filter(element => !element.classList.contains('active'));
        
        activeElement.forEach((element: any) => {
          element.style.backgroundColor = this.figmaHeroData['slider_dots'].style.activeBackgroundColor;
        });
  
        inactiveElements.forEach((element: any) => {
          element.style.backgroundColor = this.figmaHeroData['slider_dots'].style.backgroundColor;
        });
      }
    }, 100);    
  }

  heroPrevSlide() {
    // Figure out what the previous slide is
    // If we are at zero go to the last slide in the list
    if (this.currentSlideIndex === 0) {
      this.preSlideIndex = this.heroSlider.length - 1;
    } else {
      // Otherwise the next one is this slide minus 1
      this.preSlideIndex = this.currentSlideIndex - 1;
    }

    // Setup the next slide and current slide for animations
    this.heroElemRef.nativeElement.children[this.preSlideIndex].style.left =
      "-100%";
    // this.elementRef.nativeElement.getElementbyId(this.preSlideIndex).style.left = '0'
    this.heroElemRef.nativeElement.children[this.currentSlideIndex].style.left =
      "0";

    // Add the appropriate animation class to the slide
    this.heroElemRef.nativeElement.children[this.preSlideIndex].setAttribute(
      "class",
      "blocx-slider_block slideInLeft"
    );
    this.heroElemRef.nativeElement.children[
      this.currentSlideIndex
    ].setAttribute("class", "blocx-slider_block slideOutRight");

    // Set current slide to the new current slide
    this.currentSlideIndex = this.preSlideIndex;
  }
  heroPrevSlideClick() {
    clearTimeout(this.heroNextTimeValue);
    if (this.heroAutoSlideRight === false) {
      this.heroNextTimeValue = setInterval(this.heroPrevSlide.bind(this), 10000);
    }
    this.heroNextTimeValue = setInterval(this.heroNextSlide.bind(this), 10000);
    this.heroPrevSlide();
  }
  heroNextSlide() {
    // Figure out what the next slide is
    // If we are at the last slide the next one is the first (zero based)
    if (this.currentSlideIndex === this.heroSlider.length - 1) {
      this.nextSlideIndex = 0;
    } else {
      // Otherwise the next slide is the current one plus 1
      this.nextSlideIndex = this.currentSlideIndex + 1;
    }
    // Setup the next slide and current slide for animations

    this.heroElemRef.nativeElement.children[this.nextSlideIndex].style.left =
      "100%";
    this.heroElemRef.nativeElement.children[this.currentSlideIndex].style.left =
      "0";

    // Add the appropriate animation class to the slide

    this.heroElemRef.nativeElement.children[this.nextSlideIndex].setAttribute(
      "class",
      "blocx-slider_block slideInRight"
    );
    this.heroElemRef.nativeElement.children[
      this.currentSlideIndex
    ].setAttribute("class", "blocx-slider_block slideOutLeft");
    // Set current slide to the new current slide
    this.currentSlideIndex = this.nextSlideIndex;
    // // setTimeout(this.heroNextSlide.bind(this));
    // clearTimeout(this.heroNextSlide.bind(this));
  }
  heroNextSlideClick() {
    clearTimeout(this.heroNextTimeValue);
    if (this.heroAutoSlideLeft === false) {
      this.heroNextTimeValue = setInterval(this.heroPrevSlide.bind(this), 10000);
    }
    this.heroNextTimeValue = setInterval(this.heroNextSlide.bind(this), 10000);
    this.heroNextSlide();
  }
  onSwipe(evt: any) {
    const swipeLeftRight =
      Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? "right" : "left") : "";
    const swipeTopDown =
      Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? "down" : "up") : "";

    this.eventText += `${swipeLeftRight} ${swipeTopDown}<br/>`;
    console.log(this.eventText)
    if (swipeLeftRight == "left") {
      this.heroNextSlide();
      console.log(this.eventText);
    } else if (swipeLeftRight == "right") {
      this.heroPrevSlide();
      console.log(this.eventText);
    }
  }

  onPressLeft(event: any) {
    this.heroNextSlide();
  }
  onPressRight(event: any) {
    this.heroPrevSlide();
  }

  applyFigmaStyle(figmaData: any){
    let heroElements = document.getElementById('heroSlider');

    this.renderer.setStyle(heroElements, 'background-color', figmaData.backgroundColor);

    let heroTitleElements = heroElements?.childNodes;
    if (heroTitleElements) {
      let specificTitleNodes = Array.from(heroTitleElements).filter((node: ChildNode) => {
        return (node as HTMLElement).classList?.contains('blocx-slider_block');
      });
  
      for(let i=0; i <specificTitleNodes.length; i++){
        this.renderer.setStyle(specificTitleNodes[i], 'background-image', `url(${figmaData['slider_img_container'].style.url})`);

        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0], 'color', figmaData['title'].color);
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0], 'font-size', figmaData['title'].style.fontSize + 'px');
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0], 'font-weight', figmaData['title'].style.fontWeight);
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0], 'font-family', figmaData['title'].style.fontFamily);

        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[1], 'color', figmaData['description'].color);
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[1], 'font-size', figmaData['description'].style.fontSize + 'px');
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[1], 'font-weight', figmaData['description'].style.fontWeight);
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[1], 'font-family', figmaData['description'].style.fontFamily);

        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'width', figmaData['button_more'].width + 'px');
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'height', figmaData['button_more'].height + 'px');
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'background-color', figmaData['button_more'].backgroundColor);
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'border-style', 'solid');
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'border-color', figmaData['button_more'].borderColor);
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'border-width', figmaData['button_more'].borderWidth + 'px');
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'color', figmaData['button_more'].color);
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'font-size', figmaData['button_more'].style.fontSize + 'px');
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'font-weight', figmaData['button_more'].style.fontWeight);
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'font-family', figmaData['button_more'].style.fontFamily);
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'padding-top', figmaData['button_more'].paddingTop + 'px');
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'padding-bottom', figmaData['button_more'].paddingBottom + 'px');
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'padding-left', figmaData['button_more'].paddingLeft + 'px');
        this.renderer.setStyle(specificTitleNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'padding-right', figmaData['button_more'].paddingRight + 'px');
      }

      let specificDotsNodes = Array.from(heroTitleElements).filter((node: ChildNode) => {
        return (node as HTMLElement).classList?.contains('blocx-slider_dots');
      });

      let specificDotsNodesList = Array.from(specificDotsNodes[0].childNodes).filter((node: ChildNode) => {
        return (node as HTMLElement).classList?.contains('blocx-slider_dot');
      });

      console.log(specificDotsNodesList);

      for(let i=0; i<specificDotsNodesList.length; i++){
        this.renderer.setStyle(specificDotsNodesList[i], 'width', figmaData['slider_dots'].style.width + 'px');
        this.renderer.setStyle(specificDotsNodesList[i], 'height', figmaData['slider_dots'].style.height + 'px');
        this.renderer.setStyle(specificDotsNodesList[i], 'background-color', figmaData['slider_dots'].style.backgroundColor);
        this.renderer.setStyle(specificDotsNodesList[i], 'border-radius', figmaData['slider_dots'].style.borderRadius + 'px');
      }

      const allElements = document.querySelectorAll('.blocx-slider_dot');
      const allElementsArray = Array.from(allElements);
      const activeElement = document.querySelectorAll('.blocx-slider_dot.active');
      const inactiveElements = allElementsArray.filter(element => !element.classList.contains('active'));
      
      activeElement.forEach((element: any) => {
        element.style.backgroundColor = this.figmaHeroData['slider_dots'].style.activeBackgroundColor;
      });

      inactiveElements.forEach((element: any) => {
        element.style.backgroundColor = this.figmaHeroData['slider_dots'].style.backgroundColor;
      });
      
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.figmaHeroData = JSON.parse(localStorage.formattedFigmaData)['Slider'];
    console.log('Figma Hero Data: ', this.figmaHeroData);
    this.applyFigmaStyle(this.figmaHeroData);
  }

}
