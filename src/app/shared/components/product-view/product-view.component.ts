import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  @Input() productImg: string;
  @Input() productTitle: string = "";
  @Input() productPrice: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
