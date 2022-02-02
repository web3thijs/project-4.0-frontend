import { Customer } from "./Customer";

export interface Review {
  id: number;
  score: number;
  title: string;
  text: string;
  customerId: number;
  customer: Customer;
}
