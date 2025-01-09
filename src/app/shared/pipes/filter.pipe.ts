import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: Array<any>, searchInputs: any): any {
    if (!items) return [];
    if (Object.entries(searchInputs).length === 0) return items;
    return items.filter(item => {
      let notMatchingField = Object.keys(searchInputs)
        .find(key => {
          if (Array.isArray(searchInputs[key]) && searchInputs[key].length == 0) {
            return false
          }
          else if (!Array.isArray(searchInputs[key])) {
            return item[key].toString() !== searchInputs[key].toString()
          } else {
            let notMatching = searchInputs[key].some(value => {
              return item[key].toString() == value.toString()
            })
            return !notMatching;
          }
        });
      return !notMatchingField; // true if matches all fields
    });
  }
}

@Pipe({
  name: 'greatFilter',
  pure: false
})
export class GreatFilterPipe implements PipeTransform {
  transform(items: Array<any>, searchInputs: any): any {
    if (!items) return [];
    if (Object.entries(searchInputs).length === 0) return items;
    return items.filter(item => {
      let notMatchingField = Object.keys(searchInputs)
        // .find(key => +searchInputs[key] ? console.log("? value" + searchInputs[key]) : console.log("? ???" + searchInputs[key]) );
        .find(key => {
          if (+searchInputs[key]) {
            return +item[key] >= +searchInputs[key]
          } else {
            return false
          }
        });
      return !notMatchingField;
    });
  }
}
@Pipe({
  name: 'searchFilterPipe',
  pure: false
})
export class searchFilterPipe implements PipeTransform {

  transform(value: any, searchValue: any): any {

    if (!searchValue) {return value;} else{
      console.log(1)
    }

    return value.filter((v: any) => v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || v.email.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || v.company.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || v.phone.indexOf(searchValue)  > -1)

  }

}
