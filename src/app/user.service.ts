import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IUser } from './model-user/user';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  
  constructor(private http: Http) { }

  getUserByEmail(email: string): Observable<IUser> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
    .map((response: Response) => response.json())
    .map((user: IUser[]) => user[0] ? user[0] : undefined);
        
  }

  createNewUser(user: IUser): Observable<IUser> {
    return this.http.post('http://localhost:3000/users', user)
    .map((response: Response) => response.json());
  }
}
