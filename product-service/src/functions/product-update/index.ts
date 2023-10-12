import { handlerPath } from "@libs/handler-resolver";

const updateProduct = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "put",
        path: "products/{productId}",
        cors: {
          origin: "*",
          allowCredentials: false,
        },
        documentation: {
          summary: "Update a product",
          description: "Updates details of a specific product",
          requestBody: {
            description: "Updated product details",
            schema: "Product",
          },
          responseBody: {
            description: "Updated product details",
            schema: "Product",
          },
        },
      },
    },
  ],
};

export default updateProduct;
