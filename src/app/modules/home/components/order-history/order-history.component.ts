import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderHistoryDTO } from 'src/app/core/models/OrderHistoryDTO';
import { AuthService } from 'src/app/modules/security/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryDTO: OrderHistoryDTO = {
    cartProductDTOS: [],
    cartDonationDTOS: [],
    total: 0,
    country: '',
    postal: '',
    address: '',
    date: new Date()
  }

  orderHistoryDTO$: Observable<OrderHistoryDTO[]>

  constructor(private router: Router, private authService: AuthService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderHistoryDTO$ = this.orderService.getOrderHistory().pipe(
      map(response => response)
    );
  }
}
