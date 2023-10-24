import { productListHandler } from "./handler";
import { productService } from "../../services";

jest.mock("src/services", () => ({
  productService: {
    getAllProducts: jest.fn(),
  },
}));

describe("productList Handler", () => {
  it("should retrieve all products and return them", async () => {
    const mockProducts = [
      {
        id: "123",
        name: "Test Product 1",
        description: "This is the first test product",
        price: 50.0,
      },
      {
        id: "456",
        name: "Test Product 2",
        description: "This is the second test product",
        price: 75.0,
      },
    ];

    (productService.getAllProducts as jest.Mock).mockReturnValue(mockProducts);

    const response = await productListHandler();

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        products: mockProducts,
      }),
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Origin": "*",
      },
    });
  });
});
