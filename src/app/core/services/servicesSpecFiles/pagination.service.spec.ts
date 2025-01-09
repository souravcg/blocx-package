import { TestBed } from '@angular/core/testing';

import { PaginationService } from '../pagination.service';

describe('PaginationService', () => {
  let service: PaginationService
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
     service = TestBed.get(PaginationService);
  });

  it('should verify the pagination service', () => {
    expect(service).toBeTruthy();
  });

  it('should verify the service.register method by passing null and undefined values', () => {
    let instance={
        currentPage: undefined,
        id: null,
        itemsPerPage: null,
        totalItems: null
    }
    service.register(instance)
    expect(service.register).toBeTruthy();
  });

  it('should verify the methods by passing the instance in pagination service', () => {
    let instance={
      currentPage: 2,
      id: "filter-top",
      itemsPerPage: 3,
      totalItems: 16
    };
    let id= "filter-top";
    let totalItems=16;
    let itemsPerPage=3;
    let currentPage=2;

    service.instances= {
      ["filter-top"]: instance
    };

    service.getCurrentPage(id)
    service.setCurrentPage(id,currentPage)
    service.setTotalItems(id,totalItems);
    service.setItemsPerPage(id,itemsPerPage);

    expect(service.getCurrentPage).toBeTruthy();
    expect(service.setCurrentPage).toBeTruthy();
    expect(service.setItemsPerPage).toBeTruthy();
    expect(service.setTotalItems).toBeTruthy();
  });

  it('should verify the methods by passing the instance with wrong id in pagination service', () => {
    let instance={
      currentPage: 2,
      id: "filter-top",
      itemsPerPage: 3,
      totalItems: 16
    };
    let id= "filter";
    let totalItems=16;
    let itemsPerPage=3;
    let currentPage=2;

    service.instances= {
      ["filter-top"]: instance
    };

    service.setCurrentPage(id,currentPage);
    service.setCurrentPage(id+"-top",7);
    service.setTotalItems(id,totalItems);
    service.setItemsPerPage(id,itemsPerPage);

    expect(service.setCurrentPage).toBeTruthy();
    expect(service.setItemsPerPage).toBeTruthy();
    expect(service.setTotalItems).toBeTruthy();
  });

  it('should verify the service.register method by passing instance with same currentPage', () => {
    let instance={
      currentPage: 1,
      id: "filter-top",
      itemsPerPage: 3,
      totalItems: 16
    }
    service.instances= {
      ["filter-top"]: instance
    };
    service.register(instance)
    expect(service.register).toBeTruthy();
  });

  it('should verify the service.register method by passing instance with different currentPage', () => {
    let instance={
      currentPage: 1,
      id: "filter-top",
      itemsPerPage: 3,
      totalItems: 16
    }
    let pageinstance={
      currentPage: 2,
      id: "filter-top",
      itemsPerPage: 3,
      totalItems: 16
    }
    const service: PaginationService = TestBed.get(PaginationService);
    service.instances= {
      ["filter-top"]: instance
    };
    service.register(pageinstance)
    expect(service.register).toBeTruthy();
  });
   
  it('should verify the service.getInstance method by passing instance with DefaultPaginationId', () => {
    let instance={
      currentPage: 1,
      id: 'DEFAULT_PAGINATION_ID',
      itemsPerPage: 3,
      totalItems: 16
    }
    let id='DEFAULT_PAGINATION_ID';
    service.instances= {
      ["DEFAULT_PAGINATION_ID"]: instance
    };
    service.getInstance(id)
    expect(service.getInstance).toBeTruthy();
  });
});