
export interface OrderModel {
    orderId: string;
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


