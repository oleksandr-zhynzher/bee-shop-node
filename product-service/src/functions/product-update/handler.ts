import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { productService } from "src/services";

export const updateProductHandler = async (event) => {
  const { productId } = event.pathParameters;
  const updatedProduct = productService.updateProduct(productId, event.body);

  return updatedProduct
    ? formatJSONResponse({
        updatedProduct,
      })
    : formatJSONResponse(
        {
          message: "Product not found",
        },
        404
      );
};

export const main = middyfy(updateProductHandler);
