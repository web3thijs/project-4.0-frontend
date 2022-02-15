import { Product } from "./Product";

export interface ProductListPaginationDTO {
  content: Product[];
  totalPages: number;
}
