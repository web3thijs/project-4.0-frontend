import { Color } from "./Color";
import { Order } from "./Order";
import { Product } from "./Product";
import { Size } from "./Size";

export interface OrderDetail {
  id: number;
  amount: number;
  productId: number;
  orderId: number;
  sizeId: number;
  colorId: number;
  product: Product;
  order: Order;
  size: Size;
  color: Color;
}
