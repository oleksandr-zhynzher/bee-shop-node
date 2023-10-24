import { handlerPath } from "@libs/handler-resolver";

const deleteProduct = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "delete",
        path: "products/{productId}",
        cors: {
          origin: "*",
          allowCredentials: false,
        },
        documentation: {
          summary: "Delete a product",
          description: "Deletes a specific product",
        },
      },
    },
  ],
};

export default deleteProduct;
