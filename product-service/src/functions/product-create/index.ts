import { handlerPath } from "@libs/handler-resolver";

const createProduct = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "products",
        cors: {
          origin: "*",
          allowCredentials: false,
        },
        documentation: {
          summary: "Create a new product",
          description: "Creates a new product and returns its details",
          requestBody: {
            description: "Product to be created",
            schema: "Product",
          },
          responseBody: {
            description: "Created product details",
            schema: "Product",
          },
        },
      },
    },
  ],
};

export default createProduct;
