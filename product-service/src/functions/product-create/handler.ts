import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { productService } from "src/services";

export const createProductHandler = async (event) => {
  const product = productService.createProduct(event.body);
  return formatJSONResponse(
    {
      product,
    },
    201
  );
};

export const main = middyfy(createProductHandler);
