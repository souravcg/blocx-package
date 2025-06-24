import { Component, Input, OnInit, Renderer2, SimpleChanges, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "blocx-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  figmaFooterData: any;
  @Input() menuList!: any;
  
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
  }

  applyFigmaStyle(figmaData: any){
    let footerElement = document.getElementsByClassName('blocx-footer');

    this.renderer.setStyle(footerElement[0], 'background-color', figmaData.backgroundColor);

    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0], 'color', figmaData['logo_txt'].color);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0], 'font-size', figmaData['logo_txt'].style.fontSize + 'px');
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0], 'font-weight', figmaData['logo_txt'].style.fontWeight);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0], 'font-family', figmaData['logo_txt'].style.fontFamily);

    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1], 'color', figmaData['logo_brand_text'].color);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1], 'font-size', figmaData['logo_brand_text'].style.fontSize + 'px');
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1], 'font-weight', figmaData['logo_brand_text'].style.fontWeight);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1], 'font-family', figmaData['logo_brand_text'].style.fontFamily);

    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'color', figmaData['logo_desc'].color);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'font-size', figmaData['logo_desc'].style.fontSize + 'px');
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'font-weight', figmaData['logo_desc'].style.fontWeight);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'font-family', figmaData['logo_desc'].style.fontFamily);

    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0], 'color', figmaData['link_title'].color);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0], 'font-size', figmaData['link_title'].style.fontSize + 'px');
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0], 'font-weight', figmaData['link_title'].style.fontWeight);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0], 'font-family', figmaData['link_title'].style.fontFamily);

    let specificNodesList = Array.from(footerElement[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes).filter((node: ChildNode) => {
      return node.nodeName == 'LI';
    });

    console.log(specificNodesList);

    for(let i=0; i<specificNodesList.length; i++){
      this.renderer.setStyle(specificNodesList[i].childNodes[0], 'color', figmaData['link_list_text'].color);
      this.renderer.setStyle(specificNodesList[i].childNodes[0], 'font-size', figmaData['link_list_text'].style.fontSize + 'px');
      this.renderer.setStyle(specificNodesList[i].childNodes[0], 'font-weight', figmaData['link_list_text'].style.fontWeight);
      this.renderer.setStyle(specificNodesList[i].childNodes[0], 'font-family', figmaData['link_list_text'].style.fontFamily);
    }

    let specificNodesList2 = Array.from(footerElement[0].childNodes[0].childNodes[0].childNodes[1].childNodes[3].childNodes[1].childNodes[0].childNodes).filter((node: ChildNode) => {
      return node.nodeName == 'LI';
    });

    console.log(specificNodesList2);

    for(let i=0; i<specificNodesList2.length; i++){
      this.renderer.setStyle(specificNodesList2[i].childNodes[0], 'color', figmaData['link_list_text'].color);
      this.renderer.setStyle(specificNodesList2[i].childNodes[0], 'font-size', figmaData['link_list_text'].style.fontSize + 'px');
      this.renderer.setStyle(specificNodesList2[i].childNodes[0], 'font-weight', figmaData['link_list_text'].style.fontWeight);
      this.renderer.setStyle(specificNodesList2[i].childNodes[0], 'font-family', figmaData['link_list_text'].style.fontFamily);
    }

    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[1].childNodes[3].childNodes[0], 'color', figmaData['link_title'].color);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[1].childNodes[3].childNodes[0], 'font-size', figmaData['link_title'].style.fontSize + 'px');
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[1].childNodes[3].childNodes[0], 'font-weight', figmaData['link_title'].style.fontWeight);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[1].childNodes[3].childNodes[0], 'font-family', figmaData['link_title'].style.fontFamily);

    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0], 'color', figmaData['link_title'].color);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0], 'font-size', figmaData['link_title'].style.fontSize + 'px');
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0], 'font-weight', figmaData['link_title'].style.fontWeight);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0], 'font-family', figmaData['link_title'].style.fontFamily);

    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0], 'color', figmaData['link_title'].color);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0], 'font-size', figmaData['link_title'].style.fontSize + 'px');
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0], 'font-weight', figmaData['link_title'].style.fontWeight);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0], 'font-family', figmaData['link_title'].style.fontFamily);

    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[1], 'color', figmaData['Label'].color);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[1], 'font-size', figmaData['Label'].style.fontSize + 'px');
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[1], 'font-weight', figmaData['Label'].style.fontWeight);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[1], 'font-family', figmaData['Label'].style.fontFamily);

    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'color', figmaData['Sublabel'].color);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'font-size', figmaData['Sublabel'].style.fontSize + 'px');
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'font-weight', figmaData['Sublabel'].style.fontWeight);
    this.renderer.setStyle(footerElement[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[2], 'font-family', figmaData['Sublabel'].style.fontFamily);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.figmaFooterData = JSON.parse(localStorage.formattedFigmaData)['footer_container'];
    console.log('Figma Footer Data: ', this.figmaFooterData);
    this.applyFigmaStyle(this.figmaFooterData);
  }
}
