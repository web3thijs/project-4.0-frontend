import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/compat/storage';
import { Category } from 'src/app/core/models/Category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { StockService } from 'src/app/shared/services/stock.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { Organization } from 'src/app/core/models/Organization';

@Component({
  selector: 'app-organization-product-form',
  templateUrl: './organization-product-form.component.html',
  styleUrls: ['./organization-product-form.component.scss']
})
export class OrganizationProductFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;

  //Uploading image
  imageSrc: string = '';
  showPhoto: boolean = false;
  isImageChanged: boolean = false;
  ref: AngularFireStorageReference | undefined;
  task: AngularFireUploadTask | undefined;
  filePath = `producten/`;
  imageFile: any;
  uploadProgress: number | undefined;

  productId: number = 0;
  errorMessage: string = '';
  //authOrganization = JSON.parse(localStorage.getItem('id') || '');

  categories$: Observable<Category[]>;

  organization: Organization = {
    organizationName: '',
    companyRegistrationNr: '',
    vatNr: '',
    who: '',
    what: '',
    help: '',
    supportPhoneNr: '',
    supportEmail: '',
    imageUrl: '',
    id: 0,
    email: '',
    password: '',
    phoneNr: '',
    address: '',
    postalCode: '',
    country: '',
    role: ''
  };


  product$: Subscription = new Subscription();
  stock$: Subscription = new Subscription();
  organization$: Subscription = new Subscription();
  postProduct$: Subscription = new Subscription();
  putProduct$: Subscription = new Subscription();

  //reactive forms
  productForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    description: new FormControl(''),
    isActive: new FormControl(''),
    categoryId: new FormControl(''),
    organizationId: new FormControl(''),
    //categoryId: new FormControl(''),
    //organizationId: new FormControl(this.organizationService.getOrganizationById(this.authOrganization).subscribe()),
    imageUrl: new FormControl('')
  });

  stockForm = new FormGroup({
    amountInStock: new FormControl(0),
    new: new FormControl(''),
    sizeId: new FormControl(''),
    colorId: new FormControl(''),
    productId: new FormControl('')
  });

  constructor(private router: Router,
    private productService: ProductService,
    private angularFireStorage: AngularFireStorage,
    private categoryService: CategoryService,
    private stockService: StockService,
    private organizationService: OrganizationService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.productId = this.router.getCurrentNavigation()?.extras.state?.id;

    this.getProduct();
   }

  ngOnInit(): void {
    this.getCategories()
    //this.organization$ = this.organizationService.getOrganizationById(this.authOrganization).subscribe(result => this.organization= result);
  }

  ngOnDestroy(): void {
    this.product$.unsubscribe();
    this.postProduct$.unsubscribe();
    this.putProduct$.unsubscribe();
  }

  async getProduct(){
    if (this.productId != null) {
      this.product$ = await this.productService.getProductById(this.productId).subscribe(result => {
        this.organization$;
        this.productForm.setValue({
          name: result.name,
          price: result.price,
          description: result.description,
          active: result.isActive,
          organization: this.organization,
          //categoryId: result.category,
          //organization: this.organizationService.getOrganizationById(this.authOrganization).subscribe(),
          imageUrl: result.imageUrl
        });
      });
      this.stock$ = await this.stockService.getStocksByProductId(this.productId).subscribe(result => {
        this.stockForm.setValue({
          amountInStock: result.amountInStock
        });
      });
    }
  }

  async updateProduct() {
    this.putProduct$ = await this.productService.putProduct(this.productId, this.productForm.value).subscribe(result => {
        this.router.navigateByUrl("/organisatie/product");
      },
      error => {
        this.errorMessage = error.message;
      });
  }

  async addProduct(){
    this.postProduct$ = await this.productService.postProduct(this.productForm.value).subscribe(result => {
        this.router.navigateByUrl("/organisatie/product");
      },
      error => {
        this.errorMessage = error.message;
      });
  }

  async getCategories(){
    this.categories$ = this.categoryService.getCategories().pipe(
      map(response => response.content)
    );
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
  if(this.imageFile === undefined && this.isAdd) {
    this.isSubmitted = false;
    this.errorMessage = "Geen afbeelding geselecteerd";
  } else {
    if(this.isImageChanged) {
      this.task = this.angularFireStorage.upload(this.filePath, this.imageFile);
      this.task.snapshotChanges().subscribe(result => {
        this.ref?.getDownloadURL().subscribe(url => {
          this.productForm.patchValue({
            imageUrl: url
          });
          this.imageSrc = url
          if(url !== undefined) {
            this.submitData();
          }
        });
      });
      this.task.percentageChanges().subscribe(p => this.uploadProgress = p);
    } else {
      this.submitData();
    }
  }
}

async submitData() {
  if(this.isAdd) {
    this.addProduct();
  }

  if(this.isEdit) {
    this.updateProduct();
  }
}

hideShowPhoto() {
  this.showPhoto = !this.showPhoto;
}

addStock() {
  this.router.navigate(['organisatie/stock/form']);
}

}
