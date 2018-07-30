import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Category } from './model-user/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: Http) { }

addCategory(category: Category): Observable<Category> {
    return this.http.post('http://localhost:3000/categories', category)
    .map((res) => res.json());
  
}

getCategories(): Observable<Category[]> {
  return this.http.get('http://localhost:3000/categories')
  .map((res) => res.json());
}

updateCategory(category: Category): Observable<Category> {
    return this.http.put(`http://localhost:3000/categories/${category.id}`, category)
    .map((res) => res.json());
}

getCategoryById(id:number): Observable<Category> {
  return this.http.get(`http://localhost:3000/categories/${id}`)
  .map((res) => res.json());
}

}

