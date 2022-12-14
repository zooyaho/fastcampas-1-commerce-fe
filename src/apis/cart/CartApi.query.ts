import { useQuery } from '@tanstack/react-query';

import { getCart, getCartItem } from './CartApi';

export const useGetCart = (userId: number) => {
  const { data, isLoading } = useQuery(['cart'], () => getCart(userId), {
    enabled: !!userId,
  });
  return { data, isLoading };
};
export const useGetCartItem = (id: number) => {
  const { data } = useQuery(['cart', id], () => getCartItem(id), {
    enabled: !!id,
  });
  return { data };
};
