export interface AddressModel {
  addressId: number;
  userId: string;
  district: string;
  city: string;
  detail: string;
}

export interface CreateAddressModel {
    userId: string;
    district: string;
    city: string;
    detail: string;
}
