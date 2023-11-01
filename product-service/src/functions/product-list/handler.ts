import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { productService } from "src/services";

export const productListHandler = async () => {
  console.log('Get Product List Triggred');

  try {
    const products = await productService.getAllProducts();
    return formatJSONResponse({
      products,
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};

export const main = middyfy(productListHandler);
