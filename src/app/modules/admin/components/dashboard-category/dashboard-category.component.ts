import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/core/models/Category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-dashboard-category',
  templateUrl: './dashboard-category.component.html',
  styleUrls: ['./dashboard-category.component.scss']
})
export class DashboardCategoryComponent implements OnInit {
  categories$: Observable<Category[]>;
  errorMessage: string = '';
  deleteCategory$: Subscription = new Subscription();

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.deleteCategory$.unsubscribe();
  }

  getCategories() {
    this.categories$ = this.categoryService.getCategoriesNew().pipe(
      map(response => response)
    );
  }

  add() {
    this.router.navigate(['dashboard-admin/categorieën/form'], {state: {mode: 'add'}});
  }

  edit(id: number) {
    this.router.navigate(['dashboard-admin/categorieën/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.deleteCategory$ = this.categoryService.deleteCategory(id).subscribe(result => {
      this.getCategories();
    },
    error => {
      this.errorMessage = error.message;
    });
  }
}
