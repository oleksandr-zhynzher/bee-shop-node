import { Product } from "src/interfaces";
import { productRepository } from "src/repositories";

class ProductService {
  async getAllProducts(): Promise<Product[]> {
    return await productRepository.getAllProductsWithStocks();
  }
  async getProductById(id: string): Promise<Product | undefined> {
    return await productRepository.getProductById(id);
  }
  async createProduct(product: Product): Promise<Product> {
    return await productRepository.createProduct(product);
  }

  async updateProduct(
    id: string,
    product: Product
  ): Promise<Product | undefined> {
    return await productRepository.updateProduct(id, product);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return await productRepository.deleteProduct(id);
  }
}

export const productService = new ProductService();
