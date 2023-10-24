import createProduct from "@functions/product-create";
import deleteProduct from "@functions/product-delete";
import productDetails from "@functions/product-details";
import productList from "@functions/product-list";
import updateProduct from "@functions/product-update";
import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-aws-documentation"],
  provider: {
    name: "aws",
    region: "eu-west-1",
    runtime: "nodejs18.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  functions: {
    productList,
    productDetails,
    createProduct,
    deleteProduct,
    updateProduct,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node18",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    documentation: {
      api: {
        info: {
          title: "Product Service API",
          description: "API Documentation for Product Service",
          version: "1.0",
        },
      },
      models: [
        {
          name: "Product",
          description: "Product model",
          contentType: "application/json",
          schema: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              title: {
                type: "string",
              },
              description: {
                type: "string",
              },
              price: {
                type: "number",
              },
              count: {
                type: "number",
              },
            },
          },
        },
        {
          name: "ProductList",
          description: "List of all products",
          contentType: "application/json",
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                title: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                price: {
                  type: "number",
                },
                count: {
                  type: "number",
                },
              },
            },
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
