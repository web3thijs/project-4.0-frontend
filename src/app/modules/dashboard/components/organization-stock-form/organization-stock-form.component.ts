import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-organization-stock-form',
  templateUrl: './organization-stock-form.component.html',
  styleUrls: ['./organization-stock-form.component.scss']
})
export class OrganizationStockFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = '';

  size$: Subscription = new Subscription();
  color$: Subscription = new Subscription();
  produc$: Subscription = new Subscription();

  stockForm = new FormGroup({
    amountInStock: new FormControl(0),
    new: new FormControl(''),
    sizeId: new FormControl(''),
    colorId: new FormControl(''),
    productId: new FormControl('')
  });

  constructor(private router: Router) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isAdd) {
      /*this.postStatus$ = this.statusService.postStatus(this.statusForm.value).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/admin/status");
              },
              error => {
                this.errorMessage = error.message;
              });*/
    }
    if (this.isEdit) {
      /*this.putStatus$ = this.statusService.putStatus(this.statusId, this.statusForm.value).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/admin/status");
              },
              error => {
                this.errorMessage = error.message;
              });*/
    }
  }

}
