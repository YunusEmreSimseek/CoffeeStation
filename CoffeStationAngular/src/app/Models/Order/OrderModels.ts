import { AddressModel } from "../Adress/AdressModels";

export interface OrderyModel {
    orderyId: string;
    userId: string;
    productIds: string[];
    totalPrice: number;
    addressId: number;
}

export interface CreateOrderModel {
    userId: string;
    productIds: string[];
    totalPrice: number;
    addressId: number;
}


