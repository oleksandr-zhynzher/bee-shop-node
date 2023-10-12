import { deleteProductHandler } from "./handler";
import { productService } from "../../services";

jest.mock("src/services", () => ({
  productService: {
    deleteProduct: jest.fn(),
  },
}));

describe("deleteProduct Handler", () => {
  it("should return 204 status for a valid productId", async () => {
    (productService.deleteProduct as jest.Mock).mockReturnValueOnce(true);

    const mockEvent = {
      pathParameters: {
        productId: "123",
      },
    };

    const response = await deleteProductHandler(mockEvent);

    expect(response).toEqual({
      statusCode: 204,
      body: "{}",
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Origin": "*",
      },
    });
  });

  it("should return 404 if product is not found", async () => {
    (productService.deleteProduct as jest.Mock).mockReturnValueOnce(false);

    const mockEvent = {
      pathParameters: {
        productId: "456",
      },
    };

    const response = await deleteProductHandler(mockEvent);

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
