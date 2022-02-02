import { Customer } from "./Customer";
import { Product } from "./Product";
import { Review } from "./Review";

export interface Interaction {
  id: number;
  amountClicks: number;
  amountCart: number;
  amountBought: number;
  reviewId: number;
  productId: number;
  customerId: number;
  review: Review;
  product: Product;
  customer: Customer;
}
