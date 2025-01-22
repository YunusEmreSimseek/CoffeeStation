
export interface Coupon {
  id: number;
  code: string;
  rate: number;
  isActive: boolean;
  validDate: Date;
  categoryId: string;
}

export interface GetCouponModel {
  couponId: number;
  code: string;
  rate: number;
  isActive: boolean;
  validDate: Date;
}

export interface CreateCuponModel {
  code: string;
  rate: number;
  isActive: boolean;
  validDate: Date;
}
