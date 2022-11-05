import instance from '@apis/_axios/instance';

import { Order } from './OrderApi.type';

/* async function main() {
  const tossPayments = await loadTossPayments(clientKey)
} */

export async function getOrderList() {
  const { data } = await instance('/v1/order/');
  console.log(data);
  return data;
}
export async function postOrder() {
  const { data } = await instance({
    method: 'POST',
    url: '/v1/order/',
  });
  return data;
}
export async function getOrder(id: number) {
  const { data } = await instance(`/v1/order/${id}`);
  return data;
}
export async function putOrder(id: number, body: Order) {
  const { data } = await instance({
    method: 'PUT',
    url: `/v1/order/${id}`,
    data: body,
  });
  return data;
}
