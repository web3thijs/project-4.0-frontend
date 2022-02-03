import { Color } from "./Color";
import { Product } from "./Product";
import { Size } from "./Size";

export interface Stock {
    id: number;
    amountInStock: number;
    size: Size;
    color: Color;
    product: Product;

}
