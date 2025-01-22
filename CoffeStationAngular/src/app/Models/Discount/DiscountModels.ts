
export interface Coupon {
  couponId: number;
  code: string;
  rate: number;
}

export interface GetCouponModel {
  couponId: number;
  code: string;
  rate: number;
}

export interface CreateCuponModel {
  code: string;
  rate: number;
}
