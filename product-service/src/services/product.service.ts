import { Product } from "src/interfaces";
import { productRepository } from "src/repositories";

class ProductService {
  getAllProducts(): Product[] {
    return productRepository.getAllProducts();
  }
  getProductById(id: string): Product | undefined {
    return productRepository.getProductById(id);
  }
  createProduct(product: Product): Product {
    return productRepository.createProduct(product);
  }

  updateProduct(id: string, product: Product): Product | undefined {
    return productRepository.updateProduct(id, product);
  }

  deleteProduct(id: string): boolean {
    return productRepository.deleteProduct(id);
  }
}

export const productService = new ProductService();
