import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { productService } from "src/services";

export const productListHandler = async () => {
  const products = productService.getAllProducts();
  return formatJSONResponse({
    products,
  });
};

export const main = middyfy(productListHandler);
