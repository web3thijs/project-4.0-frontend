import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/core/models/Category';
import { Color } from 'src/app/core/models/Color';
import { Organization } from 'src/app/core/models/Organization';
import { Product } from 'src/app/core/models/Product';
import { Size } from 'src/app/core/models/Size';
import { Stock } from 'src/app/core/models/Stock';
import { AuthService } from 'src/app/modules/security/auth.service';
import { ColorService } from 'src/app/shared/services/color.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { SizeService } from 'src/app/shared/services/size.service';
import { StockService } from 'src/app/shared/services/stock.service';

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
  stockId: number = 0;

  size$: Subscription = new Subscription();
  color$: Subscription = new Subscription();
  product$: Subscription = new Subscription();
  sizes$: Observable<Size[]>;
  colors$: Observable<Color[]>;
  products$: Observable<Product[]>;


  size: Size = {
    id: 0,
    name: ''
  }

  color: Color = {
    id: 0,
    name: ''
  }

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
    country: '',
  }

  product: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: [],
    active: false,
    category: this.category,
    organization: this.organization
  }

  stock: Omit<Stock, "id"> = {
    amountInStock: 0,
    size: this.size,
    color: this.color,
    product: this.product
  }

  stockPut: Stock = {
    id: 0,
    amountInStock: 0,
    size: this.size,
    color: this.color,
    product: this.product
  }

  stock$: Subscription = new Subscription();
  postStock$: Subscription = new Subscription();
  putStock$: Subscription = new Subscription();

  stockForm = new FormGroup({
    amountInStock: new FormControl(0, [Validators.required]),
    size: new FormControl(0),
    color: new FormControl(0),
    product: new FormControl(0)
  });

  constructor(private router: Router, private stockService: StockService, private productService: ProductService, private authService: AuthService, private sizeService: SizeService, private colorService: ColorService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.stockId = this.router.getCurrentNavigation()?.extras.state?.id;

    this.getStock();
   }

  ngOnInit(): void {
    this.getProducts();
    this.getSizes();
    this.getColors();
  }

  async getStock(){
    if (this.stockId != null) {
      this.stock$ = this.stockService.getStocksByIdPut(this.stockId).subscribe(result => {
        this.stockForm.setValue({
          amountInStock: result.amountInStock,
          size: result.size,
          color: result.color,
          product: result.product
        });
        console.log("Amount in stock " + result.amountInStock);
      });
    }
  }

  getSizes() {
    this.sizes$ = this.sizeService.getSizes().pipe(
      map(result => result.content)
    );
  }

  getColors() {
    this.colors$ = this.colorService.getColor().pipe(
      map(result => result)
    );
  }

  getProducts() {
    this.products$ = this.productService.getProductsByOrganizationId(parseInt(this.authService.getUser()!.id)).pipe(
      map(response => response.content)
    );
  }

  ngOnDestroy(): void {
    this.stock$.unsubscribe();
    this.postStock$.unsubscribe();
    this.putStock$.unsubscribe();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.size.id = parseInt(this.stockForm.controls['size'].value);
      this.color.id = parseInt(this.stockForm.controls['color'].value);
      this.product.id = parseInt(this.stockForm.controls['product'].value);
      this.stock.amountInStock = this.stockForm.controls['amountInStock'].value;

      this.stock.size = this.size;
      this.stock.color = this.color;
      this.stock.product = this.product;

      this.postStock$ = this.stockService.postStock(this.stock).subscribe(result => {
        this.router.navigateByUrl("organisatie/producten");
      },
      error => {
        this.errorMessage = error.message;
      });
    }
    if (this.isEdit) {
      this.size.id = parseInt(this.stockForm.controls['size'].value);
      this.color.id = parseInt(this.stockForm.controls['color'].value);
      this.product.id = parseInt(this.stockForm.controls['product'].value);
      this.product.organization.id = parseInt(this.authService.getUser()!.id);
      this.stockPut.id = this.stockId;
      this.stockPut.amountInStock = this.stockForm.controls['amountInStock'].value;
      this.stockPut.size = this.size;
      this.stockPut.color = this.color;
      this.stockPut.product = this.product;

      this.putStock$ = this.stockService.putStock(this.stockPut).subscribe(result => {
        this.router.navigateByUrl("organisatie/producten");
      },
      error => {
        this.errorMessage = error.message;
      });
    }
  }
}
