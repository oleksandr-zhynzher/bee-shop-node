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
      },
    },
  ],
};

export default createProduct;
