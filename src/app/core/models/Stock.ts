import { Color } from "./Color";
import { Product } from "./Product";
import { Size } from "./Size";

export interface Stock {
    id: string;
    size: Size;
    color: Color;
    product: Product;
    amountInStock: number;
}
