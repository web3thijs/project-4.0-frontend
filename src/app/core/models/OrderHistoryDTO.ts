import { CartDonationDTO } from "./CartDonationDTO";
import { CartProductDTO } from "./CartProductDTO";

export interface OrderHistoryDTO {
  cartProductDTOS: CartProductDTO[];
  cartDonationDTOS: CartDonationDTO[];
  total: number;
  country: string;
  postal: string;
  address: string;
  date: Date;
}
