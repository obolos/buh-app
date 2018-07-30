import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../../model-user/bill';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  dollar: number;
  euro: number;
  rub: number;


  ngOnInit() {   
    const {rates} = this.currency;
    this.dollar = this.bill.value / (rates['RUB'] / rates['USD']);
    this.euro = this.bill.value / rates['RUB'];
  }

}
