import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { productService } from "src/services";

export const productDetailsHandler = async (event) => {
  const { productId } = event.pathParameters;
  const product = productService.getProductById(productId);

  return product
    ? formatJSONResponse({
        product,
      })
    : formatJSONResponse(
        {
          message: "Product not found",
        },
        404
      );
};

export const main = middyfy(productDetailsHandler);
