import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewChild,
  ComponentFactoryResolver,
} from '@angular/core';
import { Indicator, IndicatorAnimations } from '../../../shared/indicator/indicator';

import { DynamicTabComponent } from './dynamic-tab.component';
import { DynamicTabsDirective } from './dynamic-tabs.directive';

@Component({
  selector: 'blocx-tabs',
  templateUrl: './dynamic-tabs.component.html',
  styleUrls: ['./dynamic-tabs.component.scss'],
  animations: IndicatorAnimations
})
export class DynamicTabsComponent implements AfterContentInit {
  dynamicTabs: DynamicTabComponent[] = [];

  @ContentChildren(DynamicTabComponent) tabs!: QueryList<DynamicTabComponent>;

  @ViewChild(DynamicTabsDirective) dynamicTabPlaceholder!: DynamicTabsDirective;
  eventText = '';
  indicators;

  /*
    Alternative approach of using an anchor directive
    would be to simply get hold of a template variable
    as follows
  */
  // @ViewChild('container', {read: ViewContainerRef}) dynamicTabPlaceholder;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {
    this.indicators = new Indicator();
  }

  // contentChildren are set
  ngAfterContentInit() {
      // get all active tabs
      const activeTabs = this.tabs.filter(tab => tab.active);

      // if there is no active tab set, activate the first
      if (activeTabs.length === 0 && this.tabs.length) {
        this.selectTab(this.tabs.first);
      }
  
      this.tabs.changes.subscribe(() => {
        setTimeout(() => {
          if (this.tabs.length) {
            this.selectTab(this.tabs.first);
          }
        });
      });
  }

  openTab(title: string, template:any, data:any, isCloseable = false) {
    // get a component factory for our DynamicTabComponent
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      DynamicTabComponent
    );

    // fetch the view container reference from our anchor directive
    const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;

    // alternatively...
    // let viewContainerRef = this.dynamicTabPlaceholder;

    // create a component instance
    const componentRef = viewContainerRef.createComponent(componentFactory);

    // set the according properties on our component instance
    const instance: DynamicTabComponent = componentRef.instance;
    instance.title = title;
    instance.template = template;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;

    // remember the dynamic component for rendering the
    // tab navigation headers
    this.dynamicTabs.push(componentRef.instance);

    // set it active
    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }

  selectTab(tab: DynamicTabComponent) {
    // deactivate all tabs
    this.tabs.toArray().forEach(tabArray => (tabArray.active = false));
    this.dynamicTabs.forEach(tabs => (tabs.active = false));

    // activate the tab the user has clicked on.
    tab.active = true;
  }

  closeTab(tab: DynamicTabComponent) {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {
        // remove the tab from our array
        this.dynamicTabs.splice(i, 1);

        // destroy our dynamically created component again
        let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        // let viewContainerRef = this.dynamicTabPlaceholder;
        viewContainerRef.remove(i);

        // set tab index to 1st one
        this.selectTab(this.tabs.first);
        break;
      }
    }
  }

  closeActiveTab() {
    const activeTabs = this.dynamicTabs.filter(tab => tab.active);
    if (activeTabs.length > 0) {
      // close the 1st active tab (should only be one at a time)
      this.closeTab(activeTabs[0]);
    }
  }

  onTap(tab: DynamicTabComponent) {
    this.selectTab(tab);
  }
}