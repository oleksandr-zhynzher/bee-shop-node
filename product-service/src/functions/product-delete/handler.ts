import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { productService } from "src/services";

export const deleteProductHandler = async (event) => {
  console.log('Delete Product Triggred, params = ', event.pathParameters);

  try {
    const { productId } = event.pathParameters;
    const isDeleted = await productService.deleteProduct(productId);

    return isDeleted
      ? formatJSONResponse({}, 204)
      : formatJSONResponse(
          {
            message: "Product not found",
          },
          404
        );
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

export const main = middyfy(deleteProductHandler);
