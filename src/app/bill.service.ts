import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Bill } from './model-user/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private API_KEY: string = '1a86d5a0d6cd11037e2374717beaeba5';

  constructor(private http: Http) { }

  getBill(): Observable<Bill> {
    return this.http.get('http://localhost:3000/bill')
    .map((response: Response) => response.json());
  }

  getCurrency(): Observable<any> {    
    return this.http.get('http://data.fixer.io/api/latest?access_key=' + this.API_KEY)
    .map((response: Response) => response.json());
    
    
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.http.put('http://localhost:3000/bill', bill)
    .map((res) => res.json());
  }
 
}
