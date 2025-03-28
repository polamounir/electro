// interface ProductImage {
//   imageUrl: string;
// }

export interface ProductTypes {
  id: string;
  title?: string;
  price: number;
  brand?: string;
  stock?: number;
  categoryId?: string;
  tags?: string;
  description?: string;
  images?: string[];
  image?: string;
}

export interface CartItem extends ProductTypes {
  quantity: number;
}
// export interface ProductsResponse {
//   products: ProductTypes[];
// }
