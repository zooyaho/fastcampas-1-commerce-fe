export interface Tag {
  id: number;
  name: string;
}
export interface Product {
  avgRate: number;
  capacity: number;
  description: string;
  id: number;
  name: string;
  price: number;
  reviewCount: number;
  tag: Tag[];
  thumbnail: string;
}
export interface ProductList {
  results: Product[];
  cursor: string;
}
export interface ProductDetail {
  avgRate: number;
  capacity: number;
  description: string;
  detail: string;
  id: number;
  name: string;
  photo: string;
  price: number;
  reviewCount: number;
  reviewList: ProductReview[];
}
export interface ProductDetailList {
  next: string;
  previous: string;
  results: Product[];
  cursor: string;
}
export interface ProductTagReview {
  userId: number;
  nickname: string;
  rate: number;
  content: string;
  reviewimageSet: [
    {
      reviewId: number;
      url: string;
    },
  ];
  created: string;
}
export interface ProductTag {
  id: number;
  name: string;
  reviewList: ProductTagReview[];
}
export interface ProductTagList {
  count: number;
  next: string;
  previous: string;
  results: ProductTag[];
}
export interface ProductReview {
  userId: number;
  id: number;
  nickname: string;
  rate: number;
  content: string;
  reviewimageSet: [
    {
      id: string;
      reviewId: number;
      url: string;
    },
  ];
  created: string;
}
