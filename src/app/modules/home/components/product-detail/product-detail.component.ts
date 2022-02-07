import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/Product';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { AuthService } from 'src/app/modules/security/auth.service';
import { Order } from 'src/app/core/models/Order';
import { UpdateOrderDetailDTO } from 'src/app/core/models/UpdateOrderDetailDTO';
import { OrderService } from 'src/app/shared/services/order.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  user: User = {id: 0, email: "", password: "", phoneNr: "", address: "", postalCode: "", country: "", role: ""};
  user$: Subscription = new Subscription();
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

  updateOrderDetailDTO: UpdateOrderDetailDTO = {
    productId: 1,
    sizeId: 1,
    colorId: 1,
    amount: 50
  }

  updateOrderDetail$: Subscription = new Subscription();

  category: Category = {id: 0, name: ""};
  product: Product = {id: 0, name: "", price: 0, description: "", active: false, imageUrl: [""], organization: this.organization, category: this.category};
  /*stock: Stock = {id: 0, size: this.size, color: this.color, product: this.product, amountInStock: 0};
  stock$: Subscription = new Subscription();*/
  stocks$: Observable<Stock[]>;

  shoppingCart = JSON.parse(localStorage.getItem('productsInCart') || "[]");
  itemsInCart = 0;
  productsIdsInCart: string[] = [];
  alertIsShown: boolean = false;

  valueProduct = 0;


  constructor(private orderService: OrderService, private cartService: CartService, private authService: AuthService, private productService: ProductService, private route: ActivatedRoute, private categoryService: CategoryService, private organizationService: OrganizationService, private stockService: StockService, private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.stocks$ = this.stockService.getStocksByProductId(id).pipe(
      map(response => response)
    );
    //this.stockService.getStocksByProductId(id).subscribe(console.log);


    this.productService.getProductById(id).subscribe(result => (this.product = result));
  }

  async addToCart(){
    if(!this.authService.isLoggedIn()){
      this.router.navigate(["/login"]);
      return
    }

    await this.cartService.addProductToOrder(this.updateOrderDetailDTO).subscribe(console.log);
    this.updateOrderDetail$.unsubscribe();

    this.router.navigate(["/winkelmandje"]);
  }
}
