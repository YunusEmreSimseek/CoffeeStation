
export interface ProductModel {
  productId: string;
  productName: string;
  productDescription: string;
  productImageUrl: string;
  productPrice: number;
  categoryId: string;
}

export interface CreateProductModel {
  productName: string;
  productDescription: string;
  productImageUrl: string;
  productPrice: number;
  categoryId: string;
}
