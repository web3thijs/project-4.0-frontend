import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/core/models/Order';
import { Stock } from 'src/app/core/models/Stock';
import { AuthService } from 'src/app/modules/security/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { StockService } from 'src/app/shared/services/stock.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  orders: Observable<Order[]>;
  orders$: Subscription = new Subscription;
  currentOrder: Order


  constructor(private router: Router, private stockService: StockService, private orderService: OrderService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders() {
    this.orders$ = this.orderService.getOrdersByCustomerId(parseInt(this.authService.getUser()!.id)).subscribe(result => {
      for(let order of result){
        let tempOrder: Order = order
        console.log(order)
        if(tempOrder.completed == false){
          this.currentOrder = tempOrder;
        }
      }
    })

    console.log(this.currentOrder)
  }

}
