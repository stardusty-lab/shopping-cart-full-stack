import * as fetcher from "./fetcher";
import {
  mapGetShippingFeeModelToRequestDTO,
  mapGetShippingFeeResponseDTOToModel,
} from "./mapper";

import type { GetShippingFee } from "./repository.types";

export const getShippingFee: GetShippingFee = async (model) => {
  const {} = mapGetShippingFeeModelToRequestDTO(model);

  const responseDTO = await fetcher.getShippingFee({});

  return mapGetShippingFeeResponseDTOToModel(responseDTO.data);
};
