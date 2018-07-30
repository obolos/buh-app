import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventsService } from '../../../events.service';
import { CategoriesService } from '../../../categories.service';
import { WFMEvent } from '../../../model-user/event';
import { Category } from '../../../model-user/category';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  event: WFMEvent;
  category: Category; 
  isLoaded: boolean = false;
  s1: Subscription;

  constructor(private route: ActivatedRoute, 
    private eventService: EventsService, 
    private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.s1 = this.route.params
    .mergeMap((params: Params) => this.eventService.getEventById(params['id']))
    .mergeMap((event:WFMEvent) => {
      this.event = event;
      return this.categoriesService.getCategoryById(event.category);
    })
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      }); 

  }

  ngOnDestroy() {
    if(this.s1) this.s1.unsubscribe();
  }



}
