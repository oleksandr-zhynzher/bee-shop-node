import { handlerPath } from "@libs/handler-resolver";

const populateWithMockData = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "products/import/mock",
        cors: {
          origin: "*",
          allowCredentials: false,
        },
      },
    },
  ],
};

export default populateWithMockData;
