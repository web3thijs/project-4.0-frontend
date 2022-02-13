import { Category } from "./Category";
import { Organization } from "./Organization";

export interface SimilarProduct {
  productId: number;
  categoryName: string;
  description: string;
  imageUrl: string;
  organizationName: string;
  price: number;
  productName: string;
}
