import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/compat/storage';

@Component({
  selector: 'app-organization-product-form',
  templateUrl: './organization-product-form.component.html',
  styleUrls: ['./organization-product-form.component.scss']
})
export class OrganizationProductFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  productId = 0;

  isSubmitted: boolean = false;
  errorMessage: string = '';
  nameChangeMessage: string = '';
  isImageChanged: boolean = false;

  product$: Subscription = new Subscription();
  postProduct$: Subscription = new Subscription();
  putProduct$: Subscription = new Subscription();

  //reactive form
  productForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    description: new FormControl(''),
    active: new FormControl('')
  });

  stockForm = new FormGroup({
    amountInStock: new FormControl(0),
    new: new FormControl('')
  });

  // Uploading image
  imageSrc: string = '';
  ref: AngularFireStorageReference | undefined;
  task: AngularFireUploadTask | undefined;
  filePath = `producten/`;
  imageFile: any;
  uploadProgress: number | undefined;

  constructor(private router: Router, private productService: ProductService, private angularFireStorage: AngularFireStorage) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.productId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if(this.productId != null) {
      this.product$ = this.productService.getProductById(this.productId.toString()).subscribe(result => {
        this.productForm.setValue({
          name: result.name,
          price: result.price,
          description: result.description,
          active: result.active
        });
      });
    }
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.product$.unsubscribe();
    this.postProduct$.unsubscribe();
    this.putProduct$.unsubscribe();
  }

  onImageSelected(event: any): void {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    this.filePath += randomId;
    // create a reference to the storage bucket location
    this.ref = this.angularFireStorage.ref(this.filePath);
    this.imageFile = event.target.files[0];
    this.isImageChanged = true;
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if(this.isAdd) {
      this.postProduct$ = this.productService.postProduct(this.productForm.value).subscribe(result => {
        this.router.navigateByUrl("dashboard/organisatie/product");
      },
      error => {
        this.errorMessage = error.message;
      });
    }

    if(this.isEdit) {
      this.putProduct$ = this.productService.putProduct(this.productId.toString(), this.productForm.value).subscribe(result => {
        this.router.navigateByUrl("dashboard/organisatie/product");
      },
      error => {
        this.errorMessage = error.message;
      });
    }

    /*if(this.imageFile === undefined && this.isAdd) {
      this.isSubmitted = false;
      this.errorMessage = 'No image selected!';
    } else {
      if (this.isImageChanged) {
        this.task = this.angularFireStorage.upload(this.filePath, this.imageFile);
        this.task.snapshotChanges().subscribe(result => {
          this.ref?.getDownloadURL().subscribe(url => {
            this.productForm.patchValue({
              imageUrl: url
            });
            this.imageSrc = url
            if (url !== undefined) {
              this.submitData();
            }
          });
        });
        this.task.percentageChanges().subscribe(p => this.uploadProgress = p);
      } else {
        this.submitData();
    }*/

    }

}
