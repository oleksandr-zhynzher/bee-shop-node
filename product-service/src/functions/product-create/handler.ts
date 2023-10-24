import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { productService } from "src/services";
import { productValidator } from "src/validators";

export const createProductHandler = async (event) => {
  console.log("Create Product Triggred, params = ", event.body);

  if (!productValidator(event.body)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid product data" }),
    };
  }

  try {
    const product = await productService.createProduct(event.body);
    return formatJSONResponse(
      {
        product,
      },
      201
    );
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};

export const main = middyfy(createProductHandler);
