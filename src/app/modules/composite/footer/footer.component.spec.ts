import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
// import { ListComponent } from '../menu/menu.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ListModule } from '../list/list.module';
import { ListComponent } from '../list/list.component';

// test stub to check content projection
@Component({
  selector:"footer-test",
  template: `
  <blocx-footer>
    <ng-container footer-placeholder>
      <div class="container">
        <div class="blocx-grid">
          <div class="blocx-grid_col-md-6">
            <div class="blocx-grid">
              <div class="blocx-grid_col-md-3">
                <h1>Logo</h1>
              </div>
              <div class="blocx-grid_col-md-3">
                <blocx-list [listItems]="menuList_1"></blocx-list>
              </div>
            </div>
          </div>
          <div class="blocx-grid_col-md-6">
            <div class="blocx-grid">
              <div class="blocx-grid_col-md-6">
                <div class="blocx-input-group">
                  <input class="blocx-input-control footer-control" placeholder="Email" type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" ngModel #emailref="ngModel">
                  <i class="fa fa-paper-plane" aria-hidden="true"></i>
                  <div *ngIf="emailref.errors &&(emailref.touched || emailref.dirty)">
                    <span [hidden]="!emailref.errors?.pattern">
                      <p style="color: red;">You have entered an invalid email address.</p>
                    </span>
                  </div>
                  <span>Stay in touch with us for the freshest products!</span>
                </div>
              </div>
              <!-- Static HTML Code for Icons -->
              <div class="blocx-grid_col-md-6">
                <ul class="blocx-menu social-media">
                  <li><a href="#" aria-label="instagram"><i class="fa fa-instagram footr" aria-hidden="true"></i></a>
                  </li>
                  <li><a href="#" aria-label="twitter"><i class="fa fa-twitter footr" aria-hidden="true"></i></a></li>
                  <li><a href="#" aria-label="facebook"><i class="fa fa-facebook footr" aria-hidden="true"></i></a></li>
                  <li><a href="#" aria-label="google"><i class="fa fa-globe footr" aria-hidden="true"></i></a></li>
                </ul>
              </div>
              <!-- Static HTML Code for Icons -->
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  </blocx-footer>
  `
})
class FooterComponentStub implements OnInit{

    /* Footer Menu List */
  menuList_1 = [];

    constructor(){}
    ngOnInit(){}
}

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let stubComponent: FooterComponentStub;
  let stubFixture: ComponentFixture<FooterComponentStub>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, ListModule],
      declarations: [FooterComponent, FooterComponentStub
        // ListComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    stubFixture = TestBed.createComponent(FooterComponentStub);
    stubComponent = stubFixture.componentInstance;
    stubComponent.menuList_1 = [
      { url: "../../composite/toolbox", label: "Home" },
      { url: "../../composite/toolbox", label: "Discovery" },
      { url: "../../composite/toolbox", label: "Photos" },
      { url: "../../composite/toolbox", label: "Contact" }
    ];
    fixture.detectChanges();
  });

  it('should verify the creation of Footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should verify the type of menuList in the component', () => {
    stubFixture.detectChanges();
    let liComp = stubFixture.debugElement.query(By.directive(ListComponent))
    expect(liComp).toBeDefined();
    expect(liComp.componentInstance.listItems).toEqual(stubComponent.menuList_1);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
