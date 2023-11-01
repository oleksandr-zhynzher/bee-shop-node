import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { productService } from "src/services";

export const updateProductHandler = async (event) => {
  console.log(
    "Update Product Details Triggred, params = ",
    event.pathParameters,
    event.body
  );

  try {
    const { productId } = event.pathParameters;
    const updatedProduct = await productService.updateProduct(
      productId,
      event.body
    );

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
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

export const main = middyfy(updateProductHandler);
