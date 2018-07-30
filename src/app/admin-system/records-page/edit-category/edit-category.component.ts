import { Component, Input, Output, EventEmitter, OnInit, NgModule, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../../model-user/category';
import { CategoriesService } from '../../../categories.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  currentCategoryId = 1;
  currentCategory: Category;
  sub1: Subscription;
  
  constructor(private categoriesService: CategoriesService) {}
  

  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();


  ngOnInit() {    
    this.onCategoryChange();
    
  }

  onSubmit(form: NgForm) {
    let {name, capacity} = form.value;
    if (capacity < 0) capacity *= -1;

    const category = new Category(name, capacity);

    this.sub1 = this.categoriesService.updateCategory(category)
    .subscribe((category: Category) => {
      this.onCategoryEdit.emit(category);      
    });
  }

  onCategoryChange() {
    this.currentCategory = this.categories
    .find(c => c.id === +this.currentCategoryId);
    
  }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe(); 
  }
}
