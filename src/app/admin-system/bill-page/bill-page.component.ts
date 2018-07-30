import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../../bill.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Bill } from '../../model-user/bill';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  private subscription1: Subscription;
  private subscription2: Subscription;
  private bill: Bill;
  private currency: any;
  isLoaded: boolean = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.subscription1 = Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    if (this.subscription2)
      this.subscription2.unsubscribe();
  }

  onRefresh() {    
    this.subscription2 = this.billService.getCurrency()
    .subscribe((currency: any) => {
      this.currency = currency;      
    });  
  }

}
