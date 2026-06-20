import * as fetcher from "./fetcher";
import {
  mapGetCouponsModelToRequestDTO,
  mapGetCouponsResponseDTOToModel,
} from "./mapper";

import type { GetCoupons } from "./repository.types";

export const getCoupons: GetCoupons = async (model) => {
  const {} = mapGetCouponsModelToRequestDTO(model);

  const responseDTO = await fetcher.getCoupons({});

  return mapGetCouponsResponseDTOToModel(responseDTO.data);
};
