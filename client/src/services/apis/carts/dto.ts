export interface GetCartsRequestDto {
  pathParams: { cartId: number };
}

export interface GetCartsResponseDto {
  id: number;
  products: {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
    quantity: number;
  }[];
}

export interface PatchCartsProductsRequestDto {
  pathParams: { cartId: number; productId: number };
  data: { quantity: number };
}

export interface PatchCartsProductsResponseDto {
  id: number; // product id,
  name: string;
  price: number;
  imgUrl: string;
  quantity: number;
}

export interface DeleteCartsProductsRequestDto {
  pathParams: { cartId: number; productId: number };
}

// 장바구니 상품 삭제
// No Content
// export interface DeleteCartsProductsResponseDto {}
