import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SortableDirective } from './sortable.directive';

@Component({
  selector: 'blocx-table-stub',
  template: `
    <table>
      <tr>
        <th scope="col" [sortable]="'col1'  | lowercase" [direction]="direction" (sort)="onSort($event)">col1
          <span class="blocx-datatable_sort-icon"></span>
       </th>
      </tr>
    </table>
    `
})
class TestSortableDirective implements OnInit {
  direction: string = "";
  constructor() { }
  ngOnInit() { }
  onSort(event) {}
}
describe('TableComponent', () => {
  let component: TestSortableDirective;
  let fixture: ComponentFixture<TestSortableDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TestSortableDirective, SortableDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // TestSortableDirective
    fixture = TestBed.createComponent(TestSortableDirective);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should verify the creation of TestSortableDirective', () => {
    expect(component).toBeTruthy();
  });

  it('Should varify rotate method on clicking sortable directive', fakeAsync(() => {
    let sortableFixture = fixture.debugElement.query(By.directive(SortableDirective));
    let sortableDirective = sortableFixture.injector.get(SortableDirective);
    spyOn(sortableDirective, "rotate").and.callThrough();
    let tableheaderdata = fixture.debugElement.nativeElement.querySelector('th');
    tableheaderdata.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick(1000);
    expect(sortableDirective.rotate).toHaveBeenCalled();
  }));

  afterEach(() => {
    fixture.destroy();
  });
});
