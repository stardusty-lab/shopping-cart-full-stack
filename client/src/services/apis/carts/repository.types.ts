/**
 * TODO:
 * repository 반환 모델 정의 후 unknown 제거
 */

export type GetCarts = (params: { cartId: number }) => Promise<unknown>;

export type PatchCartsProducts = (command: {
  cartId: number;
  productId: number;
  quantity: number;
}) => Promise<unknown>;

export type DeleteCartsProducts = (params: {
  cartId: number;
  productId: number;
}) => Promise<void>;
