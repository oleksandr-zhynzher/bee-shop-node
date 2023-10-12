import { productsDB } from "src/database";
import { Product } from "src/interfaces";

class ProductRepository {
  // Create
  createProduct(product: Product): Product {
    productsDB.push(product);
    return product;
  }

  // Retrieve
  getProductById(id: string): Product | undefined {
    return productsDB.find((product) => product.id === id);
  }

  getAllProducts(): Product[] {
    return productsDB;
  }

  // Update
  updateProduct(
    id: string,
    updatedProduct: Product
  ): Product | undefined {
    const productIndex = productsDB.findIndex((product) => product.id === id);
    if (productIndex === -1) return undefined;
    productsDB[productIndex] = updatedProduct;
    return updatedProduct;
  }

  // Delete
  deleteProduct(id: string): boolean {
    const productIndex = productsDB.findIndex((product) => product.id === id);
    if (productIndex === -1) return false;
    productsDB.splice(productIndex, 1);
    return true;
  }
}

export const productRepository = new ProductRepository();
