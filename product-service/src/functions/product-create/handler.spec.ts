import { createProductHandler } from "./handler";
import { productService } from "../../services";

jest.mock("src/services", () => ({
  productService: {
    createProduct: jest.fn(),
  },
}));

describe("createProduct Handler", () => {
  it("should create a product and return it with a 201 status", async () => {
    const mockProduct = {
      id: "123",
      name: "Test Product",
      description: "This is a test product",
      price: 99.99,
    };

    (productService.createProduct as jest.Mock).mockReturnValueOnce(
      mockProduct
    );

    const mockEvent = {
      body: JSON.stringify(mockProduct),
    };

    const response = await createProductHandler(mockEvent);

    expect(response).toEqual({
      statusCode: 201,
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
});
