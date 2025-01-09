import { TestBed,async } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiService } from '../api-service.service';

describe('ApiService', () => {
  beforeEach(async(() => 
  TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it('should verify all the methods in apiService', () => {
    const service: ApiService = TestBed.get(ApiService);

    const component ="filter-left";
    const count=4;
    const product= [
      {
        Id: "1",
        ProductDescription: "Apple Watch Band3",
        ProductImage: "../../../../assets/images/apple.jpg",
        ProductName: "Apple",
        Quantity: 1,
        UnitPrice: 100
      }
    ];
    service.getJsonData(component);
    expect(service.getJsonData).toBeDefined();
  });
});
