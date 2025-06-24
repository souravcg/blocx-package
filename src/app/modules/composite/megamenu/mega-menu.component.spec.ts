import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaMenuComponent } from './mega-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('MegaMenuComponent', () => {
  let component: MegaMenuComponent;
  let fixture: ComponentFixture<MegaMenuComponent>;
  let menu_data: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MegaMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaMenuComponent);
    component = fixture.componentInstance;
    component.menuIndex = 2;
    component.megaMenuList = [
      {
        "logo_url": "../../../../assets/images/blocx-logo.svg",
      },
      {
        "name": "Home",
        "url": "#",
        "level": 1,
        "items": null
      },
      {
        "name": "Portfolio",
        "url": "#",
        "level": 1,
        "items": null
      },
      {
        "name": "contact",
        "url": "#",
        "level": 1,
        "leftpanel": {
          "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkaJd-Kp4Yhtqcy7AKkgdQqYroUEmd2mVW6CNscrud70VXAwVDMw",
          "heading": "CONTACT US",
          "description": "Integer onare libero nisi. Duis ac magna urna. Nulla facilisi."
        },
        "items": [
          {
            "name": "The Group",
            "url": "#",
            "level": 2,
            "items": [
              {
                "name": "Our Founder",
                "url": "#",
                "level": 3
              },
              {
                "name": "Annual Reports",
                "url": "#",
                "level": 3
              },
              {
                "name": "Governance",
                "url": "#",
                "level": 3
              },
              {
                "name": "Our Values",
                "url": "#",
                "level": 3
              },
              {
                "name": "Our Priorities",
                "url": "#",
                "level": 3
              }
            ]
          },
          {
            "name": "Categories",
            "url": "#",
            "level": 2,
            "items": [
              {
                "name": "India Leadership Team",
                "url": "#",
                "level": 3
              },
              {
                "name": "Center Heads Organization",
                "url": "#",
                "level": 3
              },
              {
                "name": "Centers of Excellence",
                "url": "#",
                "level": 3
              },
              {
                "name": "Quality Assurance India",
                "url": "test",
                "level": 3
              },
              {
                "name": "Press Release",
                "url": "#",
                "level": 3
              },
              {
                "name": "Media Coverage",
                "url": "#",
                "level": 3
              }
            ]
          }
        ]
      }
    ];

    menu_data = {
      items: [
        { name: 'Item 1' },
        { name: 'Item 2' },
        { name: 'Item 3' }
      ]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify openMegaMenu method on clicking', () => {
    const button1 = fixture.debugElement.nativeElement.querySelector('li');
    button1.click();
    spyOn(component, 'openMegaMenu')
    const button = fixture.debugElement.nativeElement.querySelector('li');
    button.click();
    expect(component.openMegaMenu).toHaveBeenCalled();
  });

  it('should verify closeMegaMenu method', () => {
    component.closeMegaMenu();
    expect(component.subMenuData).toBe('');
  });

  it('should create 3 lists in mega menu header', () => {
    let liDbElem = fixture.debugElement.queryAll(By.css('header ul li'));
    expect(liDbElem.length).toEqual(4);
    for (var i = 1; i < liDbElem.length; i++) {
      expect(liDbElem[i].nativeElement.textContent).toContain(component.megaMenuList[i]["name"])
    }
  })

  it('should set logo in about section ', () => {
    let imgElem = fixture.debugElement.query(By.css('.about-section-img center'));
    expect(imgElem).toBeDefined();
  })

  it("should set mega menu subsection data",()=>{
    spyOn(component,'openMegaMenu');
    let contactLiElem = fixture.debugElement.queryAll(By.css('header ul li'))[3];
    contactLiElem.triggerEventHandler('click',component.megaMenuList[3]);
    fixture.detectChanges();
    expect(component.openMegaMenu).toHaveBeenCalled();
  });

  it("should set submegamenudata subsection data",()=>{
    component.subMenuData = component.megaMenuList[3].items;
    fixture.detectChanges();
    component.openMegaMenu(component.megaMenuList[3].items);
    expect(component.subMenuData).toEqual("");
  });

  it('should call close function on clicking close icon',()=>{
    spyOn(component,'closeMegaMenu');
    component.openMegaMenu(component.megaMenuList[3]);
    fixture.detectChanges();
    let close = fixture.debugElement.query(By.css('.mega-menu-close-icon-span'));
    close.triggerEventHandler('click',null);
    expect(component.closeMegaMenu).toHaveBeenCalled();
  });

  it('should clear subMenuData1 when second if condition is true', () => {
    // Set up test data
    component.megaMenuList = [
      { name: 'Item 1', url: '/item1', items: true },
      { name: 'Item 2', url: '/item2', items: false },
    ];
    component.subMenuData = null;
    component.subMenuData1 = component.megaMenuList[0];
    const itemToClear = component.megaMenuList[0];
  
    // Trigger click event on the li element
    const liElement = fixture.debugElement.query(By.css('li'));
    liElement.triggerEventHandler('click', null);
    fixture.detectChanges();
  
    // Verify subMenuData1 has been cleared
    expect(component.subMenuData1).toBe('');
  })

  it('should set subMenuData and subMenuData1 to empty strings', () => {
    component.menu();

    expect(component.subMenuData).toEqual('');
    expect(component.subMenuData1).toEqual('');
  });

  it('should emit onMegaMenuImageClick event with the correct payload', () => {
    const mockEvent = 'some event';
    const mockMegaMenuList = 'some menu list';

    spyOn(component.onMegaMenuImageClick, 'emit');

    component.imageNavigation(mockEvent);

    expect(component.onMegaMenuImageClick.emit).toHaveBeenCalledWith({
      megaMenuItem: mockEvent,
      megaMenuList: mockMegaMenuList,
      itemClick: true
    });
  });

  it('should set subMenuData1 to empty string if subMenuData1 name matches item name', () => {
    const mockItem = { name: 'Item 1' };
    component.subMenuData1 = { name: 'Item 1' };

    component.openMegaMenu(mockItem);

    expect(component.subMenuData1).toEqual('');
  });

  it('should set subMenuData3 to empty string if subMenuData1 name matches item name', () => {
    const mockItem = { name: 'Item 1' };
    component.subMenuData3 = { name: 'Item 1' };

    component.openMegaMenu(mockItem);

    expect(component.subMenuData3).toEqual('');
  });

  it('should remove sub-menu_4-open class from blocxSubMenu4 and openmenu4 if blocxSubMenu4[0] has sub-menu_4-open class', () => {
    const mockElement = document.createElement('div');
    mockElement.classList.add('sub-menu_4-open');
    const mockNodeList = {
      item: (index: number) => index === 0 ? mockElement : null,
      length: 1,
      forEach: () => {},
      entries: () => {},
      keys: () => {},
      values: () => {},
      [Symbol.iterator]: () => {},
    };

    // spyOn(document, 'querySelectorAll').and.returnValue(mockNodeList);

    component.subMenuToggle3({}); // Provide a mock event object

    expect(mockElement.classList.contains('sub-menu_4-open')).toBe(false);
    // expect(component.openmenu4.classList.contains('sub-menu_4-open')).toBe(false);
  });

  it('should remove sub-menu_4-open class from blocxSubMenu4 and openmenu2 if blocxSubMenu4[0] has sub-menu_4-open class', () => {
    const mockElement = document.createElement('div');
    mockElement.classList.add('sub-menu_2-open');
    const mockNodeList = {
      item: (index: number) => index === 0 ? mockElement : null,
      length: 1,
      forEach: () => {},
      entries: () => {},
      keys: () => {},
      values: () => {},
      [Symbol.iterator]: () => {},
    };

    // spyOn(document, 'querySelectorAll').and.returnValue(mockNodeList);

    component.subMenuToggle2({}); // Provide a mock event object

    expect(mockElement.classList.contains('sub-menu_2-open')).toBe(false);
    // expect(component.openmenu4.classList.contains('sub-menu_4-open')).toBe(false);
  });

  it('should remove sub-menu_4-open class from blocxSubMenu4 and openmenu4 if blocxSubMenu4[0] has sub-menu_4-open class', () => {
    const mockElement = document.createElement('div');
    mockElement.classList.add('sub-menu_4-open');
    const mockNodeList = {
      item: (index: number) => index === 0 ? mockElement : null,
      length: 1,
      forEach: () => {},
      entries: () => {},
      keys: () => {},
      values: () => {},
      [Symbol.iterator]: () => {},
      contains: (className: string) => className === 'sub-menu_4-open',
      remove: (className: string) => {},
    };

    const openmenu2 = document.createElement('div');
    const openmenu3 = document.createElement('div');
    const openmenu4 = document.createElement('div');

    spyOn(document, 'getElementById').and.returnValues(openmenu2, openmenu3, openmenu4);
    // spyOn(document, 'querySelectorAll').and.returnValue(mockNodeList);
    spyOn(mockElement.classList, 'remove');

    component.subMenuToggle3({});

    expect(mockElement.classList.contains('sub-menu_4-open')).toBe(false);
    expect(openmenu4.classList.contains('sub-menu_4-open')).toBe(false);
    expect(mockElement.classList.remove).toHaveBeenCalledWith('sub-menu_4-open');
    expect(openmenu4.classList.remove).toHaveBeenCalledWith('sub-menu_4-open');
  });

  it('should update "subMenuData" if condition is true', () => {
    const item = { name: 'example' };
    component.subMenuData = item;
    component.openMegaMenuV3(item, 'M');
    expect(component.subMenuData).toEqual('');
  });

  it('should update "subMenuData1" if condition is true', () => {
    const item = { name: 'example' };
    component.subMenuData1 = item;
    component.openMegaMenuV3(item, 'M');
    expect(component.subMenuData1).toEqual('');
  });

  it('should update "subMenuData3" if condition is true', () => {
    const item = { name: 'example' };
    component.subMenuData3 = item;
    component.openMegaMenuV3(item, 'M');
    expect(component.subMenuData3).toEqual('');
  });

  it('should toggle the "opened" property of the item for subMobMenuToggle2', () => {
    const item = { opened: false };
    component.subMobMenuToggle2(item);
    expect(item.opened).toBe(true);
  });

  it('should toggle the "opened" property of the item for subMobMenuToggle3', () => {
    const item = { opened: false };
    component.subMobMenuToggle3(item);
    expect(item.opened).toBe(true);
  });
  
  it('should update tempMenuData, push menu_data to prevData, and update menuIndex when menu_data has items', () => {
    const initialTempMenuData = component.tempMenuData;
    const initialPrevData = component.prevData;
    const initialMenuIndex = component.menuIndex;

    component.goToNextItem(menu_data, 0);
    expect(component.tempMenuData).toEqual(menu_data.items);
    expect(component.prevData).toContain(menu_data);
    expect(component.menuIndex).toBe(menu_data.level + 1);
    expect(component.tempMenuData).not.toBe(initialTempMenuData);
    expect(component.prevData).not.toBe(initialPrevData);
    expect(component.menuIndex).not.toBe(initialMenuIndex);
  });

  it('should not update tempMenuData, prevData, and menuIndex when menu_data does not have items', () => {
    menu_data.items = undefined;
    const initialTempMenuData = component.tempMenuData;
    const initialPrevData = component.prevData;
    const initialMenuIndex = component.menuIndex;
    component.goToNextItem(menu_data, 0);

    expect(component.tempMenuData).toBe(initialTempMenuData);
    expect(component.prevData).toEqual(initialPrevData);
    expect(component.menuIndex).toBe(initialMenuIndex);
  });

  it('should update menuIndex and set tempMenuData to megaMenuList3 when menuIndex is 1', () => {
    component.menuIndex = 1;
    const initialMenuIndex = component.menuIndex;
    const initialTempMenuData = component.tempMenuData;
    component.goToBackItem();
    expect(component.menuIndex).toBe(1);
    expect(component.tempMenuData).toBe(component.megaMenuList3);
    expect(component.menuIndex).not.toBe(initialMenuIndex);
    expect(component.tempMenuData).not.toBe(initialTempMenuData);
  });


  it('should update menuIndex and set tempMenuData based on the previous level item when menuIndex is not 1', () => {
    const initialMenuIndex = component.menuIndex;
    const initialTempMenuData = component.tempMenuData;
    component.goToBackItem();
    expect(component.menuIndex).toBe(initialMenuIndex - 1);
    expect(component.tempMenuData).toEqual(component.prevData[0].items);
    expect(component.menuIndex).not.toBe(initialMenuIndex);
    expect(component.tempMenuData).not.toBe(initialTempMenuData);
  });
  

  afterEach(() => {
    fixture.destroy();
  });
});
