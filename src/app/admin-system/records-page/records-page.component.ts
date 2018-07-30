import { Component, OnInit } from '@angular/core';
import { Category } from '../../model-user/category';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {
  categories: Category[] = [];
  isLoaded: boolean = false;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getCategories()
    .subscribe((categories: Category[]) => {
      this.categories = categories;
      this.isLoaded = true;
    });
  }


  newCategoryAdded(category: Category) {
      this.categories.push(category);
  }

  newEditCategory(category: Category) {
    const idx = this.categories
    .findIndex(c => c.id === category.id);
    this.categories[idx] = category;
  }

}
