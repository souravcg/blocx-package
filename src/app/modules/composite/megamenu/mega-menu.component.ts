import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, SimpleChanges, Renderer2 } from '@angular/core';

@Component({
  selector: 'blocx-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MegaMenuComponent implements OnInit {

  @Input() megaMenuList: any;
  @Input() megaMenuList1: any;
  @Input() megaMenuList3: any;
  @Input()
  megaMenuCustomClass!: string;
  @Input()
  subMegaMenuCustomClass!: string;
  @Input()
  megaMenuLogoAltText!: string;

  @Input() menuType: any;

  @Output() readonly onMegaMenuItemClick = new EventEmitter<any>();
  @Output() readonly onMegaMenuImageClick = new EventEmitter<any>();

  subMenuData: any;
  subMenuData1: any;
  subMenuData3: any;
  subMenuData4: any;
  menuLinks: any;
  tempMenuData: any;
  prevData: any = [];
  menuIndex: number = 1;

  figmaMegaMenuData: any;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    try {
      const localData = localStorage.formattedFigmaData ? JSON.parse(localStorage.formattedFigmaData) : null;
      this.figmaMegaMenuData = localData && localData['Header'] ? localData['Header'] : null;
      console.log('Figma MegaMenu Data: ', this.figmaMegaMenuData);
      if (this.figmaMegaMenuData) {
        this.applyFigmaStyle(this.figmaMegaMenuData);
      }
    } catch (e) {
      console.warn('No valid Figma MegaMenu Data found in localStorage. Skipping style application.');
      this.figmaMegaMenuData = null;
    }
  }

  openMegaMenu(item: any) {
    this.onMegaMenuItemClick.emit({
      megaMenuItem: item,
      megaMenuList: this.megaMenuList,
      itemClick: true
    })
    
    if (this.subMenuData && this.subMenuData.name === item.name) {
      this.subMenuData = "";
    } else {
      this.subMenuData = item;
    }
    if (this.subMenuData1 && this.subMenuData1.name === item.name) {
      this.subMenuData1 = "";
    } else {
      this.subMenuData1 = item;
    }
    if (this.subMenuData3 && this.subMenuData3.name === item.name) {
      this.subMenuData3 = "";
    } else {
      this.subMenuData3 = item;
    }
  }

  openMegaMenuV3(item: any, flag: any) {
    this.onMegaMenuItemClick.emit({
      megaMenuItem: item,
      megaMenuList: this.megaMenuList,
      itemClick: true
    })
    
    if (this.subMenuData && this.subMenuData.name === item.name) {
      this.subMenuData = "";
    } else {
      this.subMenuData = item;
    }
    if (this.subMenuData1 && this.subMenuData1.name === item.name) {
      this.subMenuData1 = "";
    } else {
      this.subMenuData1 = item;
    }
    if (this.subMenuData3 && this.subMenuData3.name === item.name) {
      this.subMenuData3 = "";
    } else {
      this.subMenuData3 = item;
    }

    if(flag == 'M'){
      item.opened = !item.opened;
    }
  }

  subMenuToggle3(e: any) {
    console.log("Toggle 3");
    var openmenu2 = document.getElementById('open_sub_menu_2');
    var openmenu3 = document.getElementById('open_sub_menu_3');
    var openmenu4 = document.getElementById('open_sub_menu_4');

    var blocxSubMenu3 = document.querySelectorAll('.blocx-sub_menu_2 .sub-menu_3');
    var blocxSubMenu4 = document.querySelectorAll('.blocx-sub_menu_3 .sub-menu_4');
    blocxSubMenu3[0].classList.toggle('sub-menu_2-open');
    if(openmenu4){
      openmenu4.classList.toggle('sub-menu_4-open');
    }
    
    if (blocxSubMenu4[0].classList.contains('sub-menu_4-open')) {
      blocxSubMenu4[0].classList.remove('sub-menu_4-open');
      if(openmenu4){
        openmenu4.classList.remove('sub-menu_4-open');
      }
    }
  }

  subMenuToggle2(e: any) {
    console.log("Toggle 2");
    var openmenu2 = document.getElementById('open_sub_menu_2');
    var openmenu3 = document.getElementById('open_sub_menu_3');
    var openmenu4 = document.getElementById('open_sub_menu_4');
    var blocxSubMenu2 = document.querySelectorAll('.blocx-header .sub-menu_2');
    var blocxSubMenu3 = document.querySelectorAll('.blocx-sub_menu_2 .sub-menu_3');
    var blocxSubMenu4 = document.querySelectorAll('.blocx-sub_menu_3 .sub-menu_4');
    blocxSubMenu2[0].classList.toggle('sub-menu_2-open');

    if(openmenu3){
      openmenu3.classList.toggle('sub-menu_3-open');
    }
    
    if (blocxSubMenu3[0].classList.contains('sub-menu_3-open')) {
      blocxSubMenu3[0].classList.remove('sub-menu_3-open');
      if(openmenu3){
        openmenu3.classList.remove('sub-menu_3-open');
      }
      blocxSubMenu4[0].classList.remove('sub-menu_4-open');
      if(openmenu4){
        openmenu4.classList.remove('sub-menu_4-open');
      }
    }
  }

  subMobMenuToggle2(item: any){
    item.opened = !item.opened;
  }
  subMobMenuToggle3(item: any){
    item.opened = !item.opened;
  }

  navmenu() {
    console.log('navmenu');
    this.tempMenuData = this.megaMenuList3;
    this.menuIndex = 1;
    
    var menuToggle = document.getElementById("menuButton");
    this.menuLinks = document.getElementById("menuLink");
    if (menuToggle) {
      menuToggle.classList.toggle("menu-icon-close");
      if (
        this.menuLinks.style.width === "0" ||
        this.menuLinks.style.width === "0px" ||
        this.menuLinks.style.width === ""
      ) {
        this.menuLinks.style.width = "300px";
        this.menuLinks.parentElement.classList.add("overlay");
        document.body.style.overflow = "hidden";
      } else {
        this.menuLinks.style.width = "0";
        setTimeout(() => {
          this.menuLinks.parentElement.classList.remove("overlay");
          document.body.style.overflow = "auto";
        }, 350);
      }
    }
  }

  goToNextItem(menu_data: any, index: any){
    console.log(menu_data, " --- ", index);
    if(menu_data.items){
      this.tempMenuData = menu_data.items;    
      this.prevData.push(menu_data);
      this.menuIndex = menu_data.level + 1;

      console.log(this.prevData);
    }
  }

  goToBackItem(){
    this.menuIndex = this.menuIndex - 1;

    if(this.menuIndex == 1){
      this.tempMenuData = this.megaMenuList3;
    } else{
      this.prevData.filter((item: any)=>{
        if(item.level == this.menuIndex - 1){
          this.tempMenuData = item.items;
        }
      });
    }
  }

  closeMegaMenu() {
    this.subMenuData = "";
    this.subMenuData1 = "";
  }

  menu() {
    this.subMenuData = "";
    this.subMenuData1 = "";
  }

  imageNavigation(event: any) {
    this.onMegaMenuImageClick.emit({
      megaMenuItem: event,
      megaMenuList: this.megaMenuList,
      itemClick: true
    });
  }

  applyFigmaStyle(figmaData: any){
    if (!figmaData) return;
    let megaMenuElements = document.getElementById('megaMenuHeaderId_');
    if (!megaMenuElements || !megaMenuElements.childNodes[0]) return;
    this.renderer.setStyle(megaMenuElements.childNodes[0], 'background-color', figmaData.backgroundColor);
    this.renderer.setStyle(megaMenuElements.childNodes[0], 'border', 'none');
    
    //this.renderer.setStyle(megaMenuElements?.childNodes[0], 'border-color', figmaData.borderColor);
    //this.renderer.setStyle(megaMenuElements?.childNodes[0], 'border-width', figmaData.border + 'px');

    let hdr_logo = megaMenuElements.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0] as HTMLImageElement;
    if (hdr_logo && hdr_logo.tagName === 'IMG' && figmaData['header_logo']?.style?.url) {
      hdr_logo.src = figmaData['header_logo'].style.url;
    }

    let menuLinkElements = megaMenuElements.childNodes[0]?.childNodes[0]?.childNodes[2]?.childNodes[0]?.childNodes;
    if (menuLinkElements && figmaData['header_menu']?.color && figmaData['header_menu']?.style) {
      let specificNodes = Array.from(menuLinkElements).filter((node: ChildNode) => {
        return (node as HTMLElement).classList?.contains('blocx-web-display');
      });
  
      console.log(specificNodes);
      for(let i=0; i <specificNodes.length; i++){
        this.renderer.setStyle(specificNodes[i]?.childNodes[0], 'color', figmaData['header_menu'].color);
        this.renderer.setStyle(specificNodes[i]?.childNodes[0], 'font-family', figmaData['header_menu'].style.fontFamily);
        this.renderer.setStyle(specificNodes[i]?.childNodes[0], 'font-size', figmaData['header_menu'].style.fontSize + 'px');
        this.renderer.setStyle(specificNodes[i]?.childNodes[0], 'font-weight', figmaData['header_menu'].style.fontWeight);
      }
    }
    if (megaMenuElements.childNodes[0]?.childNodes[1]?.childNodes[2] && figmaData['user_grid']?.bgColor) {
      this.renderer.setStyle(megaMenuElements.childNodes[0].childNodes[1].childNodes[2], 'background-color', figmaData['user_grid'].bgColor);
    }
    if (megaMenuElements.childNodes[0]?.childNodes[1]?.childNodes[2]?.childNodes[0] && figmaData['user_grid']?.color && figmaData['user_grid']?.style) {
      this.renderer.setStyle(megaMenuElements.childNodes[0].childNodes[1].childNodes[2].childNodes[0], 'color', figmaData['user_grid'].color);
      this.renderer.setStyle(megaMenuElements.childNodes[0].childNodes[1].childNodes[2].childNodes[0], 'font-family', figmaData['user_grid'].style.fontFamily);
      this.renderer.setStyle(megaMenuElements.childNodes[0].childNodes[1].childNodes[2].childNodes[0], 'font-size', figmaData['user_grid'].style.fontSize + 'px');
      this.renderer.setStyle(megaMenuElements.childNodes[0].childNodes[1].childNodes[2].childNodes[0], 'font-weight', figmaData['user_grid'].style.fontWeight);
    }
  }
}
