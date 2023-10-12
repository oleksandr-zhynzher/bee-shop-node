import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { productService } from "src/services";

export const deleteProductHandler = async (event) => {
  const { productId } = event.pathParameters;
  const isDeleted = productService.deleteProduct(productId);

  return isDeleted
    ? formatJSONResponse({}, 204)
    : formatJSONResponse(
        {
          message: "Product not found",
        },
        404
      );
};

export const main = middyfy(deleteProductHandler);
