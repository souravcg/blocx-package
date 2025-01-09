import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private currentCartCount = new BehaviorSubject(0);
  currentMessage = this.currentCartCount.asObservable();

  constructor(private httpService: HttpClient) { }

  getJsonData(component: any) {
    return this.httpService.get('../../assets/json/' + component + '.json');
  }

}