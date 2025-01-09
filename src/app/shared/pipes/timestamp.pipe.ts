import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    var /** @type {?} */ d = new Date(value);
    var /** @type {?} */ now = new Date();
    var /** @type {?} */ seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
    var /** @type {?} */ minutes = Math.round(Math.abs(seconds / 60));
    var /** @type {?} */ hours = Math.round(Math.abs(minutes / 60));
    var /** @type {?} */ days = Math.round(Math.abs(hours / 24));
    var /** @type {?} */ months = Math.round(Math.abs(days / 30.416));
    // var /** @type {?} */ years = Math.round(Math.abs(days / 365));

    if (Number.isNaN(seconds)) {
      return '';
    }
    else if (seconds <= 45) {
      return 'a few seconds ago';
    }
    else if (seconds <= 90) {
      return 'a minute ago';
    }
    else if (minutes <= 45) {
      return minutes + ' minutes ago';
    }
    else if (minutes <= 90) {
      return 'an hour ago';
    }
    else if (hours <= 22) {
      return hours + ' hours ' + Math.round(minutes%60) +' minutes ago';
    }
    else if (hours <= 36) {
      return 'a day ago';
    }
    else if (days <= 25) {
      return days + ' days ago';
    }
    else if (days <= 45) {
      return 'a month ago';
    }
    else if (days <= 345) {
      return months + ' months ago';
    }
    else if (days <= 545) {
      return 'a year ago';
    }
    else {
      return this.getCustomDateFormat(d)
    }
  }

  getCustomDateFormat = (dateTime) => { 
    var hour =  dateTime.getHours()
    var minute = dateTime.getMinutes()
    var date = dateTime.getDate();
    var month = dateTime.toLocaleString('en-US', {month:"short"})
    var year =  dateTime.toLocaleString('en-US', {year:"numeric"})
    var time = (hour > 12) ? (hour-12 + ':' + minute +' PM') : (hour + ':' + minute +' AM');

    return month +" "+date+", "+year+", "+time
  };
  

}
