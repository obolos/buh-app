import { Injectable } from '@angular/core';
import { WFMEvent } from './model-user/event';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: Http) { }


  addEvent(event: WFMEvent): Observable<WFMEvent> {
    return this.http.post('http://localhost:3000/events', event)
    .map((res) => res.json());
  
}

getEvents(): Observable<WFMEvent[]> {
  return this.http.get('http://localhost:3000/events')
  .map((res) => res.json());
}

getEventById(id:string): Observable<WFMEvent> {
  return this.http.get(`http://localhost:3000/events/${id}`)
  .map((res) => res.json());
}


}
