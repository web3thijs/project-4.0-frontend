import { Category } from "./Category";
import { Organization } from "./Organization";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string[];
  active: boolean;
  category: Category;
  organization: Omit<Organization, "role">;

}
