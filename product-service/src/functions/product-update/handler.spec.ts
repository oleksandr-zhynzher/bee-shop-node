import { updateProductHandler } from "./handler";
import { productService } from "../../services";

jest.mock("src/services", () => ({
  productService: {
    updateProduct: jest.fn(),
  },
}));

describe("updateProduct Handler", () => {
  it("should update a product and return the updated product", async () => {
    const mockProduct = {
      id: "123",
      name: "Updated Product",
      description: "This is an updated product",
      price: 99.99,
    };

    (productService.updateProduct as jest.Mock).mockReturnValue(mockProduct);

    const mockEvent = {
      pathParameters: {
        productId: "123",
      },
      body: JSON.stringify(mockProduct),
    };

    const response = await updateProductHandler(mockEvent);

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        updatedProduct: mockProduct,
      }),
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Origin": "*",
      },
    });
  });

  it("should return 404 if the product is not found", async () => {
    (productService.updateProduct as jest.Mock).mockReturnValue(null);

    const mockEvent = {
      pathParameters: {
        productId: "456",
      },
      body: JSON.stringify({
        name: "Non-existent Product",
        description: "This product does not exist",
        price: 99.99,
      }),
    };

    const response = await updateProductHandler(mockEvent);

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
