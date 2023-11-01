import { DynamoDB } from "aws-sdk";
import { Product } from "src/interfaces";

// Initialize DynamoDB Document Client
const dynamoDb = new DynamoDB.DocumentClient();

class ProductRepository {
  private PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;
  private PRODUCTS_STOCKS_TABLE = process.env.PRODUCTS_STOCKS_TABLE;

  // Create a product
  async createProduct(product: Product): Promise<Product> {
    const transactItems = [
      {
        Put: {
          TableName: this.PRODUCTS_TABLE,
          Item: {
            id: product.id,
            description: product.description,
            price: product.price,
            title: product.title,
          },
        },
      },
      {
        Put: {
          TableName: this.PRODUCTS_STOCKS_TABLE,
          Item: { product_id: product.id, count: product.count },
        },
      },
    ];

    // Use DynamoDB's transactWrite method to ensure atomicity
    await dynamoDb.transactWrite({ TransactItems: transactItems }).promise();

    return product;
  }

  // Retrieve a product by ID
  async getProductById(id: string): Promise<Product | null> {
    const params = {
      TableName: this.PRODUCTS_TABLE,
      Key: { id },
    };

    const result = await dynamoDb.get(params).promise();
    return (result.Item as Product) || null;
  }

  // Retrieve all products
  async getAllProducts(): Promise<Product[]> {
    const params = {
      TableName: this.PRODUCTS_TABLE,
    };

    const result = await dynamoDb.scan(params).promise();
    return result.Items as Product[];
  }

  // Update a product
  async updateProduct(
    id: string,
    updatedProduct: Product
  ): Promise<Product | null> {
    const params = {
      TableName: this.PRODUCTS_TABLE,
      Key: { id },
      UpdateExpression:
        "set #title = :title, description = :description, price = :price",
      ExpressionAttributeNames: {
        "#title": "title",
      },
      ExpressionAttributeValues: {
        ":title": updatedProduct.title,
        ":description": updatedProduct.description,
        ":price": updatedProduct.price,
      },
      ReturnValues: "ALL_NEW",
    };

    const result = await dynamoDb.update(params).promise();
    return (result.Attributes as Product) || null;
  }

  // Delete a product
  async deleteProduct(id: string): Promise<boolean> {
    const params = {
      TableName: this.PRODUCTS_TABLE,
      Key: { id },
    };

    await dynamoDb.delete(params).promise();
    return true;
  }

  async getAllProductsWithStocks(): Promise<any[]> {
    // Fetch all products
    const productsResult = await dynamoDb
      .scan({ TableName: this.PRODUCTS_TABLE })
      .promise();
    const products = productsResult.Items;

    // Fetch all stocks
    const stocksResult = await dynamoDb
      .scan({ TableName: this.PRODUCTS_STOCKS_TABLE })
      .promise();
    const stocks = stocksResult.Items;

    // Join products with their stocks based on product ID
    const joinedResults = products.map((product) => {
      const stock = stocks.find((s) => s.product_id === product.id);
      return {
        ...product,
        count: stock ? stock.count : 0, // Add count from the stock table
      };
    });

    return joinedResults;
  }
}

export const productRepository = new ProductRepository();
