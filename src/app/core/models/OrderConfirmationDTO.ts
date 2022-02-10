import { CartDonationDTO } from "./CartDonationDTO";
import { CartProductDTO } from "./CartProductDTO";

export interface OrderConfirmationDTO {
  cartProductDTOS: CartProductDTO[];
  cartDonationDTOS: CartDonationDTO[];
  country: string;
  postal: string;
  address: string;
}
