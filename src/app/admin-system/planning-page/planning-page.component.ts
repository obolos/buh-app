import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../../bill.service';
import { CategoriesService } from '../../categories.service';
import { EventsService } from '../../events.service';
import { Observable, Subscription } from 'rxjs';
import { Bill } from '../../model-user/bill';
import { Category } from '../../model-user/category';
import { WFMEvent } from '../../model-user/event';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  s1: Subscription;
  isLoaded: boolean = false;
  bill: Bill;
  categories: Category[] = [];
  events: WFMEvent[] = [];

  constructor(private billService: BillService, 
              private categoryService: CategoriesService, 
              private eventService: EventsService) { }

  ngOnInit() {    
    this.s1 = Observable.combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Bill, Category[], WFMEvent[]]) => {
        this.bill = data[0];
        this.categories = data[1];
        this.events = data[2]; 
        
        this.isLoaded = true;         
    });  

     
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');    
    return catEvents.reduce((total, e) => {
      total += e.amount; 
      return total;     
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if(this.s1) this.s1.unsubscribe();
  }

}
