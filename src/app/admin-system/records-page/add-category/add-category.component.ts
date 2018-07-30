import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../../categories.service';
import { Category } from '../../../model-user/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {

   @Output() onAddCategory = new EventEmitter<Category>(); 
   sub1: Subscription;
   

  constructor(private categoriesService: CategoriesService) { }

 
  onSubmit(form: NgForm) {
    let { name, capacity } = form.value;    
    if (capacity < 0) capacity *= -1;
    let category = new Category(name, capacity);

    this.sub1 = this.categoriesService.addCategory(category)
    .subscribe((category: Category) => {
      this.onAddCategory.emit(category);  
      form.reset();
      form.form.patchValue({capacity: 1}); 
    });     
    
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }

}
