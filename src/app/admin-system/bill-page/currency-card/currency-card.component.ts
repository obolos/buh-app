import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: any;

  dollar: number;
  euro: number;
  rub: number;
  date: Date;
  

  ngOnInit() {    
    const {rates} = this.currency;

    this.date = this.currency.date;
    this.dollar = rates['RUB'] / rates['USD'];
    this.euro = rates['RUB'];

  }

}
