/**
 * TODO:
 * repository 반환 모델 정의 후 unknown 제거
 */

interface GetCartsParmas {
  cartId: number;
}

export type GetCarts = (params: GetCartsParmas) => Promise<unknown>;

interface PatchCartsProductsCommand {
  cartId: number;
  productId: number;
  quantity: number;
}

export type PatchCartsProducts = (
  command: PatchCartsProductsCommand,
) => Promise<unknown>;

interface DeleteCartsProductsParams {
  cartId: number;
  productId: number;
}

export type DeleteCartsProducts = (
  params: DeleteCartsProductsParams,
) => Promise<void>;
