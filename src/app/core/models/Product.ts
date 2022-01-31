import { Category } from "./Category";
import { Organization } from "./Organization";

export interface Product {
  id: string;
  category: Category;
  organization: Organization;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  active: boolean;
}
