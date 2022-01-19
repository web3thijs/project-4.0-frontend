import { Organization } from "./Organization";

export interface Product {
  id: string;
  categoryId: number;
  organizationId: number;
  name: string;
  price: number;
  description: string;
  isActive: boolean;
  imageUrl: string;
  organization: Organization;
}
