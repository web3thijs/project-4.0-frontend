import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { CartDTO } from 'src/app/core/models/CartDTO';
import { CartProductDTO } from 'src/app/core/models/CartProductDTO';
import { InteractionService } from 'src/app/shared/services/interaction.service';
import { AddToInteractionDTO } from 'src/app/core/models/AddToInteractionDTO';
import { SimilarProduct } from 'src/app/core/models/SimilarProduct';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy{
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
    productId: 0,
    sizeId: 0,
    colorId: 0,
    amount: 0
  }

  addToInteractionDTO: AddToInteractionDTO = {
    customerId: 0,
    productId: 0
  }

  noSizeId: number = 0;

  updateOrderDetail: Observable<UpdateOrderDetailDTO>;

  category: Category = {id: 0, name: ""};
  product: Product = {id: 0, name: "", price: 0, description: "", active: false, imageUrl: [""], organization: this.organization, category: this.category};
  /*stock: Stock = {id: 0, size: this.size, color: this.color, product: this.product, amountInStock: 0};
  stock$: Subscription = new Subscription();*/
  stocks$: Observable<Stock[]>;
  product$: Subscription;

  shoppingCart = JSON.parse(localStorage.getItem('productsInCart') || "[]");
  itemsInCart = 0;
  productsIdsInCart: string[] = [];
  alertIsShown: boolean = false;

  valueProduct = 0;

  products: Observable<CartProductDTO[]>;
  similarProducts: Observable<SimilarProduct[]>;

  amount = 1;
  id: number = 0;


  constructor(private orderService: OrderService, private cartService: CartService,
    private authService: AuthService, private productService: ProductService,
    private route: ActivatedRoute, private categoryService: CategoryService,
    private organizationService: OrganizationService, private stockService: StockService,
    private router: Router, private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id
    this.stocks$ = this.stockService.getStocksByProductId(this.id).pipe(
      map(response => response)
    );
    //this.stockService.getStocksByProductId(id).subscribe(console.log);


    this.product$ = this.productService.getProductById(this.id).subscribe(result => (this.product = result));
    this.getSimilarProducts();
  }

  ngOnDestroy(): void {
    this.product$.unsubscribe();
  }

  addAmount(): void {
    this.amount++;
  }

  reduceAmount(): void {
    if(this.amount == 1) return;
    this.amount--;
  }

  getCart() {
    this.products = this.cartService.getCart().pipe(
      map(result => result.cartProductDTOS)
    )
  }

  getSimilarProducts(){
    this.similarProducts = this.productService.getSimilarProducts(this.id).pipe(
      map(result => result)
    )
  }

  async addToCart(){
    if(!this.authService.isLoggedIn()){
      this.router.navigate(["/inloggen"]);
      return
    }

    if(this.authService.getRole() !=  "CUSTOMER"){
      //WARNING FOR ORGANIZATION AND ADMIN
      return
    }

    this.addToInteractionDTO.customerId = parseInt(this.authService.getUser()!.id);
    this.addToInteractionDTO.productId = this.product.id

    this.updateOrderDetailDTO.productId = this.product.id
    this.updateOrderDetailDTO.amount = this.amount

    if(this.updateOrderDetailDTO.sizeId <= 0){
      this.updateOrderDetailDTO.sizeId = 1
    }

    this.updateOrderDetailDTO.colorId = this.updateOrderDetailDTO.sizeId

    await this.interactionService.addCart(this.addToInteractionDTO).toPromise();
    await this.cartService.addProductToOrder(this.updateOrderDetailDTO).toPromise();

    this.router.navigate(["/winkelmandje"]);
  }

  async onClick(productId: number) {
    // if(this.authService.getRole() ==  "CUSTOMER"){
    //   this.addToInteractionDTO.customerId = parseInt(this.authService.getUser()!.id);
    //   this.addToInteractionDTO.productId = productId

    //   await this.interactionService.addClick(this.addToInteractionDTO).toPromise();
    // }
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/producten', productId]));
  }
}
