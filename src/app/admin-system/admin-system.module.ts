import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system/system.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './dropdown.directive';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import { BillService } from '../bill.service';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import { CategoriesService } from '../categories.service';
import { EventsService } from '../events.service';
import { HistoryChartComponent } from './history-page/history-chart/history-chart.component';
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component';
import { HistoryEventsComponent } from './history-page/history-events/history-events.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FilterPipe } from '../filter-pipe';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  declarations: [
    SystemComponent, 
    BillPageComponent, 
    HistoryPageComponent, 
    PlanningPageComponent, 
    RecordsPageComponent, 
    SidebarComponent, 
    HeaderComponent, 
    DropdownDirective, 
    BillCardComponent, 
    CurrencyCardComponent, 
    AddCategoryComponent, 
    AddEventComponent, 
    EditCategoryComponent, 
    HistoryChartComponent, 
    HistoryDetailComponent,
     HistoryEventsComponent, 
     HistoryFilterComponent,
     FilterPipe],
  
    providers: [
      BillService, 
      CategoriesService,
      EventsService
    ]
})
export class AdminSystemModule { }
