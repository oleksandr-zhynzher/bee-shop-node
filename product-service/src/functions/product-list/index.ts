import { handlerPath } from "@libs/handler-resolver";

const productList = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "products",
        cors: {
          origin: "*",
          allowCredentials: false,
        },
        documentation: {
          summary: "List all products",
          description: "Returns a list of all products",
          responseBody: {
            description: "List of products",
            schema: "ProductList",
          },
        },
      },
    },
  ],
};

export default productList;
