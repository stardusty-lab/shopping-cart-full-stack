/**
 * TODO:
 * repository 반환 모델 정의 후 unknown 제거
 */

export interface GetCartsParmas {
  cartId: number;
}

export type GetCarts = (params: GetCartsParmas) => Promise<unknown>;

export interface PatchCartsProductsCommand {
  cartId: number;
  productId: number;
  quantity: number;
}

export type PatchCartsProducts = (
  command: PatchCartsProductsCommand,
) => Promise<unknown>;

export interface DeleteCartsProductsParams {
  cartId: number;
  productId: number;
}

export type DeleteCartsProducts = (
  params: DeleteCartsProductsParams,
) => Promise<void>;
