import { Color } from "./Color";
import { Product } from "./Product";
import { Size } from "./Size";

export interface Stock {
    id: number;
    amountInStock: number;
    sizeId: number;
    colorId: number;
    productId: number;
    size: Size;
    color: Color;
    product: Product;

}
