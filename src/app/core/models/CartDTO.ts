import { CartDonationDTO } from "./CartDonationDTO";
import { CartProductDTO } from "./CartProductDTO";

export interface CartDTO {
  cartProductDTOS: CartProductDTO[];
  cartDonationDTOS: CartDonationDTO[];
  total: number;
}
