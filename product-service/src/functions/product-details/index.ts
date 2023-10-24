import { handlerPath } from "@libs/handler-resolver";

const productDetails = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "products/{productId}",
        cors: {
          origin: "*",
          allowCredentials: false,
        },
        documentation: {
          summary: "Get product details",
          description: "Returns details of a specific product",
          responseBody: {
            description: "Product details",
            schema: "Product",
          },
        },
      },
    },
  ],
};

export default productDetails;
