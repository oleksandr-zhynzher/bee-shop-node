import { productDetailsHandler } from "./handler";
import { productService } from "../../services";

jest.mock("../../services", () => ({
  productService: {
    getProductById: jest.fn(),
  },
}));

describe("productDetails Handler", () => {
  it("should return product details for a valid productId", async () => {
    const mockProduct = {
      id: "123",
      name: "Test Product",
      description: "This is a test product",
      price: 99.99,
    };

    (productService.getProductById as jest.Mock).mockReturnValueOnce(
      mockProduct
    );

    const mockEvent = {
      pathParameters: {
        productId: "123",
      },
    };

    const response = await productDetailsHandler(mockEvent);

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        product: mockProduct,
      }),
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Origin": "*",
      },
    });
  });

  it("should return 404 if product is not found", async () => {
    (productService.getProductById as jest.Mock).mockReturnValueOnce(null);

    const mockEvent = {
      pathParameters: {
        productId: "456",
      },
    };

    const response = await productDetailsHandler(mockEvent);

    expect(response).toEqual({
      statusCode: 404,
      body: JSON.stringify({
        message: "Product not found",
      }),
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Origin": "*",
      },
    });
  });
});
