import { Customer } from "./Customer";

export interface Order {
  id: number;
  date: Date;
  completed: boolean;
  customerId: number;
  customer: Customer;
}
