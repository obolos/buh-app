import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Category } from '../../../model-user/category';
import { NgForm } from '@angular/forms';
import { WFMEvent } from '../../../model-user/event';
import { EventsService } from '../../../events.service';
import { BillService } from '../../../bill.service';
import { Bill } from '../../../model-user/bill';
import { Message } from '../../../model-user/message';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];
  message: Message;  
  sub1: Subscription;
  sub2: Subscription;


  types = [{type: 'income', label:'Доход'},
           {type: 'outcome', label:'Расход'}
          ];  

  constructor(private eventsService: EventsService, private billService: BillService) {}

  ngOnInit() {
    
    this.message = new Message('danger', '');
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 3000);
  }

  onSubmit(form: NgForm) {
    
    let {amount, description, category, type} = form.value;
    if (amount < 0) amount *= -1;    

    let wdate = new Date().toLocaleDateString('ru',{
    day:"2-digit", 
    month:"2-digit", 
    year:"numeric", 
    hour:"2-digit", 
    minute:"2-digit", 
    second:"2-digit"}); 
                                  
    this.sub1 = this.billService.getBill()
    .subscribe((bill: Bill) => {
      let value = 0;
      if (type === 'outcome') {
        if(amount > bill.value) {
            this.showMessage(`You don't have enough money, actually: ${bill.value - amount}`);            
            return;
        } else {
          value = bill.value - amount;
        }

      } else {
        value = bill.value + amount;
      }
      
      let wevent = new WFMEvent(type, amount, parseInt(category), moment().format('DD.MM.YYYY HH:mm:ss'), description);

      this.sub2 = this.billService.updateBill({value, currency: bill.currency})
      .mergeMap(() => this.eventsService.addEvent(wevent))      
      .subscribe(() => {        
        form.setValue({
          amount: 1,
          description: '',
          category: 1,
          type: 'outcome'
        });
      });      
    });
    
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
   }

}
