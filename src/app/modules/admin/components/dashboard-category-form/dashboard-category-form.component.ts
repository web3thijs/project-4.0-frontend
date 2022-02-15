import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/models/Category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-dashboard-category-form',
  templateUrl: './dashboard-category-form.component.html',
  styleUrls: ['./dashboard-category-form.component.scss']
})
export class DashboardCategoryFormComponent implements OnInit {
  categoryId: number = 0;
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = '';
  category: Omit<Category, "id"> = {
    name: ''
  }

  putCategory: Category = {
    id: 0,
    name: ''
  }

  category$: Subscription = new Subscription();
  postCategory$: Subscription = new Subscription();
  putCategory$: Subscription = new Subscription();
  deleteCategory: Subscription = new Subscription();

  categoryForm = new FormGroup({
    name: new FormControl('')
  })

  constructor(private router: Router, private categoryService: CategoryService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.categoryId = this.router.getCurrentNavigation()?.extras.state?.id;

    this.getCategory();
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.category$.unsubscribe();
    this.postCategory$.unsubscribe();
    this.putCategory$.unsubscribe();
  }

  getCategory() {
    if (this.categoryId != null && this.categoryId > 0) {
      this.category$ = this.categoryService.getCategoryById(this.categoryId).subscribe(result => {
        this.categoryForm.setValue({
          name: result.name
        });
      });
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.category.name = this.categoryForm.controls['name'].value;
      this.postCategory$ = this.categoryService.postCategory(this.category).subscribe(result => {
                this.router.navigateByUrl("/admin/categorieën");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
    if (this.isEdit) {
      this.putCategory.name = this.categoryForm.controls['name'].value;
      this.putCategory.id = this.categoryId;
      this.putCategory$ = this.categoryService.putCategory(this.putCategory).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/admin/categorieën");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }
}
