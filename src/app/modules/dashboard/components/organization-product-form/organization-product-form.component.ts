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
import { Product} from 'src/app/core/models/Product';
import { AuthService } from 'src/app/modules/security/auth.service';
import { Stock } from 'src/app/core/models/Stock';

@Component({
  selector: 'app-organization-product-form',
  templateUrl: './organization-product-form.component.html',
  styleUrls: ['./organization-product-form.component.scss']
})
export class OrganizationProductFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;

  testOrganization$: Subscription = new Subscription();

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

  stocks$: Observable<Stock[]>;

  categories$: Observable<Category[]>;
  category: Category = {
    id: 0,
    name: ''
  }

  organization: Omit<Organization, "role"> = {
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
    country: ''
  };

  product: Omit<Product, "id"> = {
    name: '',
    price: 0,
    description: '',
    imageUrl: [],
    active: false,
    category: this.category,
    organization: this.organization
  }

  productPut: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: [],
    active: false,
    category: this.category,
    organization: this.organization
  }


  product$: Subscription = new Subscription();
  stock$: Subscription = new Subscription();
  organization$: Subscription = new Subscription();
  postProduct$: Subscription = new Subscription();
  putProduct$: Subscription = new Subscription();
  deleteStock$: Subscription = new Subscription();

  //reactive forms
  productForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0),
    active: new FormControl('false'),
    category: new FormControl(0),
    imageUrl: new FormControl('')
  });

  constructor(private router: Router,
    private productService: ProductService,
    private angularFireStorage: AngularFireStorage,
    private categoryService: CategoryService,
    private stockService: StockService,
    private organizationService: OrganizationService,
    private authService: AuthService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.productId = this.router.getCurrentNavigation()?.extras.state?.id;

    this.getProduct();
   }

  ngOnInit(): void {
    this.getCategories();
    this.getStocks();
    //this.organization$ = this.organizationService.getOrganizationById(this.authOrganization).subscribe(result => this.organization= result);
  }

  ngOnDestroy(): void {
    this.product$.unsubscribe();
    this.postProduct$.unsubscribe();
    this.putProduct$.unsubscribe();
    this.deleteStock$.unsubscribe();
  }

  getStocks() {
    this.stocks$ = this.stockService.getStocksByProductId(this.productId).pipe(
      map(response => response)
    );
  }

  edit(id: number) {
    this.router.navigate(['organisatie/stock/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.deleteStock$ = this.stockService.deleteStock(id).subscribe(result => {
      this.getStocks();
    },
    error => {
      this.errorMessage = error.message;
    });
  }

  async getProduct(){
    if (this.productId != null) {
      this.product$ = await this.productService.getProductById(this.productId).subscribe(result => {
        this.organization$;
        this.productForm.setValue({
          name: result.name,
          description: result.description,
          price: result.price,
          active: result.active,
          category: result.category,
          imageUrl: result.imageUrl[0]
        });
        console.log(result.imageUrl);
      });
    }
  }

  async updateProduct() {
    this.organization.id = parseInt(this.authService.getUser()!.id);
    this.category.id = parseInt(this.productForm.controls['category'].value);
    this.productPut.id = this.productId;
    this.productPut.name = this.productForm.controls['name'].value;
    this.productPut.description = this.productForm.controls['description'].value;
    this.productPut.price = this.productForm.controls['price'].value;
    this.productPut.active = JSON.parse(this.productForm.controls['active'].value);
    this.productPut.imageUrl = [this.productForm.controls['imageUrl'].value];
    this.productPut.category = this.category;
    this.productPut.organization = this.organization;
    console.log(this.productId);
    this.putProduct$ = await this.productService.putProduct(this.productPut).subscribe(result => {
        this.router.navigateByUrl("/organisatie/product");
      },
      error => {
        this.errorMessage = error.message;
      });
  }

  async addProduct(){
    this.organization.id = parseInt(this.authService.getUser()!.id);
    this.category.id = parseInt(this.productForm.controls['category'].value);
    this.product.name = this.productForm.controls['name'].value;
    this.product.description = this.productForm.controls['description'].value;
    this.product.price = this.productForm.controls['price'].value;
    this.product.active = JSON.parse(this.productForm.controls['active'].value);
    this.product.imageUrl = [this.imageSrc];
    this.product.category = this.category;
    this.product.organization = this.organization;
    this.postProduct$ = await this.productService.postProduct(this.product).subscribe(result => {
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
          console.log(url);
          this.productForm.patchValue({
            imageUrl: url
          });
          this.imageSrc = url
          console.log("ImageSrc " + this.imageSrc);
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
  this.router.navigate(['organisatie/stock/form'], {state: {mode: 'add'}});
}

}
