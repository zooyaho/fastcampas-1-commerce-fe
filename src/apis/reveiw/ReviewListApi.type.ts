export interface Review {
  userId: number;
  id: number;
  productId: number;
  nickname: string;
  orderItemId: number;
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
export interface ReviewList {
  count: number;
  next: string;
  previous: string;
  results: Review[];
}