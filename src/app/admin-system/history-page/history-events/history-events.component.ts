import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() events = [];
  @Input() categories = [];
  searchValue: string = '';
  searchPlaceholder: string = 'Сумма';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find((c) => c.id === e.category).name;
    })
  }

  getEventClass(e) {
    return {
      'label' : true,
      'label-danger' : e.type === 'outcome',
      'label-success' : e.type === 'income' 
    }
  }

  changeCriteria(field: string) {
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
