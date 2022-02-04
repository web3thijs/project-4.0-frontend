import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/Product';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/core/models/Category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Organization } from 'src/app/core/models/Organization';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { User } from 'src/app/core/models/User';
import { Stock } from 'src/app/core/models/Stock';
import { Color } from 'src/app/core/models/Color';
import { Size } from 'src/app/core/models/Size';
import { StockService } from 'src/app/shared/services/stock.service';
import { OrderDetail } from 'src/app/core/models/OrderDetail';
import { Order } from 'src/app/core/models/Order';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { AuthService } from 'src/app/modules/security/auth.service';
import { Customer } from 'src/app/core/models/Customer';
import { OrderDetailService } from 'src/app/shared/services/order-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  user: User = {id: 0, email: "", password: "", phoneNr: "", address: "", postalCode: "", country: "", role: ""};
  user$: Subscription = new Subscription();
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

  customer: Customer = {
    firstName: '',
    lastName: '',
    id: 0,
    email: '',
    password: '',
    phoneNr: '',
    address: '',
    postalCode: '',
    country: '',
    role: ''
  }

  category: Category = {id: 0, name: ""};

  product: Product = {id: 0, name: "", price: 0, description: "", active: false, imageUrl: [], organization: this.organization, category: this.category};
  order: Order = {
    id: 0,
    date: new Date(),
    completed: false,
    customer: this.customer
  }

  size2: Size = {
    id: 0,
    name: ''
  }

  color2: Color = {
    id: 0,
    name: ''
  }

  orderDetail: OrderDetail = {
    id: 0,
    amount: 0,
    product: this.product,
    order: this.order,
    size: this.size2,
    color: this.color2
  }

  organization$: Subscription = new Subscription();
  category$: Subscription = new Subscription();
  product$: Subscription = new Subscription();
  color: Color = {id: 0, name: ""};
  color$: Subscription = new Subscription();
  size: Size = {id: 0, name: ""};
  size$: Subscription = new Subscription();
  /*stock: Stock = {id: "", size: this.size, color: this.color, product: this.product, amountInStock: 0};
  stock$: Subscription = new Subscription();*/
  stocks$: Observable<Stock[]>;

  shoppingCart = JSON.parse(localStorage.getItem('productsInCart') || "[]");
  itemsInCart = 0;
  productsIdsInCart: string[] = [];
  alertIsShown: boolean = false;

  valueProduct = 0;


  stocks: Stock[] = [];
  stocks2$: Subscription = new Subscription();

  selectedStock = 0;

  postOrderDetail$: Subscription = new Subscription();

  constructor(private productService: ProductService, private orderDetailService: OrderDetailService, private route: ActivatedRoute, private categoryService: CategoryService, private organizationService: OrganizationService, private stockService: StockService, private customerService: CustomerService, private authService: AuthService) { }

  ngOnDestroy(): void {
    this.stocks2$.unsubscribe();
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.stocks$ = this.stockService.getStocksByProductId(id).pipe(
      map(response => response)
    );

    this.stocks$.subscribe(result =>{
      this.stocks = result;
    });

    //this.stockService.getStocksByProductId(id).subscribe(console.log);


    this.productService.getProductById(id).subscribe(result => (this.product = result));
    this.amountChange();
    console.log("ID: " + id);

    if(this.shoppingCart != null){
      this.itemsInCart = JSON.parse(localStorage.productsInCart).length;
    } else {
      console.log("Cart is empty");
    }

    for(let i = 0; i < this.itemsInCart; i++){
      console.log(this.shoppingCart[i].id);
      this.productsIdsInCart.push(this.shoppingCart[i].id);
    }

    console.log("Shoppingcart " + this.shoppingCart);
    console.log("Items in cart: " + this.itemsInCart);
    console.log("ProductIDS " + this.productsIdsInCart);
    console.log("Organizations " + this.organization$);
  }

  amountChange() {
    this.valueProduct ++;
    console.log("Value " + this.valueProduct);
  }

  addToCart(){
    this.postOrderDetail$ = this.orderDetailService.postOrderDetail(this.orderDetail).subscribe(result => {
      console.log(result)
    });
  }

  AddToShopping() {
    var productsAdd = JSON.parse(localStorage.getItem("productsInCart") || "[]");
    if(this.productsIdsInCart.includes(this.product.id.toString())) {
      this.alertIsShown = true;
    } else {
      var productAdd = {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        description: this.product.description,
        isActive: this.product.active,
        imageUrl: this.product.imageUrl,
        valueProduct: this.valueProduct
      };
      productsAdd.push(productAdd);
      localStorage.setItem("productsInCart", JSON.stringify(productsAdd));
      localStorage.setItem('totalOrderPrice', JSON.stringify(0));
      localStorage.setItem('shippingCost', JSON.stringify(0));
      location.reload();
    }
  }
}
