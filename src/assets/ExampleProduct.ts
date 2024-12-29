import { TProductCreate } from "@/interface/entity/product.model"
import type { type } from "node:os"

export const exampleProduct: TProductCreate = {
    price: 99, // A valid price for the product
    img: "https://example.com/product-image.jpg", // A sample image URL
    type: "Electronics", // A product type, e.g., Electronics, Clothing, etc.
    qty: 50, // Quantity of the product in stock
    desc: "A high-quality wireless mouse with ergonomic design.", // Description of the product
    location: "Warehouse A", // The location where the product is stored
    name: "Wireless Mouse", // Name of the product
}
