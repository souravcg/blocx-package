import { FilterPipe, GreatFilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  const response=[{
    "productCategory": [
      {
        "name": "Mobiles1",
        "value": "Mobiles",
        "id": 1
      },
      {
        "name": "Fashion",
        "value": "FashionLABEL",
        "id": 2
      },
    ],
    "productName": [
      {
        "name": "A",
        "value": "A"
      },
      {
        "name": "B",
        "value": "B"
      }
    ],
    "model": [
      {
        "name": "1",
        "value": "1"
      },
      {
        "name": "2",
        "value": "2"
      }
    ],
    "color": [
      {
        "name": "Black",
        "value": "Black"
      },
      {
        "name": "White",
        "value": "White"
      }
    ],
    "pagination": {
      "count": 300,
      "page": 1,
      "perPage": 10,
      "pagesToShow": 10
    },
    "cardData": [
      {
        "cardImgPath": "../../../assets/images/blocx-filter_card-img-1.png",
        "wishlistIcon": "../../../../assets/images/blocx-card_icon-wish-symbol.svg",
        "imgAltText": "Card image",
        "wishlistIconAltText": "wish list icon",
        "title": "Mobiles A 1 black",
        "type": "Bag",
        "subTitle": "Hidesign",
        "description": "Greyhound divisively hello coldly wonderfully",
        "price": "2,500",
        "discountPercent": "10% off",
        "discount": "600",
        "currencySymbol": "../../../../assets/images/blocx-card_icon-rupee-symbol.svg",
        "ratingValue": "(301)",
        "Wishlist": "Wishlist",
        "DeliveryOn": "Delivery 04/06/2019 10.00 am",
        "ctaText": "ADD TO CART",
        "category": "Mobiles",
        "name": "A",
        "model": 1,
        "color": "Black"
      },
      {
        "cardImgPath": "../../../assets/images/blocx-filter_card-img-1.png",
        "wishlistIcon": "../../../../assets/images/blocx-card_icon-wish-symbol.svg",
        "imgAltText": "Card image",
        "wishlistIconAltText": "wish list icon",
        "title": "Mobiles A 1 white",
        "type": "Bag",
        "subTitle": "Hidesign",
        "description": "Greyhound divisively hello coldly wonderfully",
        "price": "2,500",
        "discountPercent": "10% off",
        "discount": "600",
        "currencySymbol": "../../../../assets/images/blocx-card_icon-rupee-symbol.svg",
        "ratingValue": "(301)",
        "Wishlist": "Wishlist",
        "DeliveryOn": "Delivery 04/06/2019 10.00 am",
        "ctaText": "ADD TO CART",
        "category": "Mobiles",
        "name": "B",
        "model": 1,
        "color": "White"
      }
    ],
    "config" : {
      "id": "filter-top",
      "itemsPerPage": 3,
      "currentPage": 1
  },
  }];
  let searchInput:any;
  beforeEach(()=>{
    searchInput={
      productCategory: ["Electronics", "Fashion"],
      color: "Black",
      model: "1",
      productName: "A"
    };
  })

  it('should verify the instance of GreatFilter Pipe transform method by passing  data', () => {    
    const pipe = new GreatFilterPipe();
    pipe.transform(response,searchInput);
    expect(pipe.transform).toBeTruthy();
  });

  it('should verify the instance of Filter Pipe transform method by passing  data', () => {    
    const pipe = new FilterPipe();
    let searchData={
      productCategory: ["Electronics", "Fashion"],
      color: "Black",
      model: "1",
      productName: "A"
    };
    pipe.transform(response,searchData);
    expect(pipe.transform).toBeTruthy();
  });

  it('should verify the instance of Filter Pipe transform method by passing  data', () => {    
    const pipe = new FilterPipe();
    let searchData={
      productCategory: [],
      color: "Black",
      model: "1",
      productName: "A"
    };
    pipe.transform(response,searchData);
    expect(pipe.transform).toBeTruthy();
  });

  it('should verify the instance of GreatFilter Pipe transform method by passing empty array of data', () => {
    const response=[{}];
    const searchInput=[];
    const pipe = new GreatFilterPipe();
    pipe.transform(response,searchInput);
    expect(pipe.transform).toBeTruthy();
  });
  
  it('should verify the instance of GreatFilter Pipe transform method by passing null data', () => {
    const response=null;
    const searchInput=[];
    const pipe = new GreatFilterPipe();
    pipe.transform(response,searchInput);
    expect(pipe.transform).toBeTruthy();
  });

  it('should verify the instance of FilterPipe transform method by passing empty array of data', () => {
    const response=[{}];
    const searchInput={};
    const pipe = new FilterPipe();
    pipe.transform(response,searchInput);
    expect(pipe.transform).toBeTruthy();
  });

  it('should verify the instance of FilterPipe transform method by passing null data', () => {
    let response=null;
    let searchInput={};
    const pipe = new FilterPipe();
    pipe.transform(response,searchInput);
    expect(pipe.transform).toBeTruthy();
  });
});
