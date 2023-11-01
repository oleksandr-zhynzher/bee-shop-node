import { middyfy } from "@libs/lambda";
import { Product } from "src/interfaces";
import { productService } from "src/services";
import { S3 } from "aws-sdk";

export const populateWithMockData = async () => {
  const s3 = new S3();

  try {
    // Fetch the mock data from S3
    const data = await s3
      .getObject({
        Bucket: "product-mock-import",
        Key: "products_mock.json",
      })
      .promise();

    const products: Product[] = JSON.parse(data.Body.toString());

    // Process each product
    for (const product of products) {
      await productService.createProduct(product);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Mock data populated successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};

export const main = middyfy(populateWithMockData);
