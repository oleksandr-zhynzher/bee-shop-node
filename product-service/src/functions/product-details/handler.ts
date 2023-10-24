import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { productService } from "src/services";

export const productDetailsHandler = async (event) => {
  console.log('Get Product Details Triggred, params = ', event.pathParameters);

  try {
    const { productId } = event.pathParameters;
    const product = await productService.getProductById(productId);

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
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

export const main = middyfy(productDetailsHandler);
