export interface Product {
  productId: number;
  categoryId: number;
  organizationId: number;
  name: string;
  price: number;
  description: string;
  isActive: boolean;
  imageUrl: string;
}
