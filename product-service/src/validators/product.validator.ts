import { Product } from "src/interfaces";

export function productValidator(product: Product): boolean {
  if (
    !product.id ||
    !product.title ||
    !product.description ||
    typeof product.price !== "number"
  ) {
    return false;
  }
  return true;
}
