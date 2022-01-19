import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/Product';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/models/Category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Organization } from 'src/app/core/models/Organization';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  organization: Organization = {id: 0, customerId: 0, name: "", companyRegistrationNr: "", vatNr: "", about: "", supportPhoneNr: "", supportEmail: ""};
  organization$: Subscription = new Subscription();
  product: Product = {id: "", categoryId: 0, organizationId: 0, name: "", price: 0, description: "", isActive: false, imageUrl: "", organization:this.organization};
  product$: Subscription = new Subscription();

  shoppingCart = JSON.parse(localStorage.getItem('productsInCart') || "[]");
  itemsInCart = 0;
  productsIdsInCart: string[] = [];
  alertIsShown: boolean = false;


  constructor(private productService: ProductService, private route: ActivatedRoute, private categoryService: CategoryService, private organizationService: OrganizationService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.productService.getProductById(id).subscribe(result => (this.product = result));
    this.getOrganizationById();

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
  }

  getOrganizationById() {
    this.organization$ = this.organizationService.getOrganizationById(this.product.organizationId).subscribe(result => this.organization = result);
  }

  AddToShopping() {
    var productsAdd = JSON.parse(localStorage.getItem("productsInCart") || "[]");
    if(this.productsIdsInCart.includes(this.product.id)) {
      this.alertIsShown = true;
    } else {
      var productAdd = {
        id: this.product.id,
        categoryId: this.product.categoryId,
        organizationId: this.product.organizationId,
        name: this.product.name,
        price: this.product.price,
        description: this.product.description,
        isActive: this.product.isActive,
        imageUrl: this.product.imageUrl
      };
      productsAdd.push(productAdd);
      localStorage.setItem("productsInCart", JSON.stringify(productsAdd));
      location.reload();
    }



  }
}
