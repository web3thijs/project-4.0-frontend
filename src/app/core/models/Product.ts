import { Category } from "./Category";
import { Organization } from "./Organization";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isActive: boolean;
  categoryId: number;
  organizationId: number;
  category: Category;
  organization: Organization;
}
