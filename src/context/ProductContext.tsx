import React, { createContext, useState, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string | null;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined,
);

const initialProducts: Product[] = [
  {
    id: "1",
    name: "AirPods Pro",
    price: "450",
    description: "Wireless earbuds with active noise cancellation",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361",
  },
  {
    id: "2",
    name: "Apple Watch Series 9",
    price: "399",
    description:
      "Advanced health tracker with ECG, blood oxygen monitor, and Always-On display",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-card-40-s9-202309?wid=340&hei=264&fmt=p-jpg&qlt=95&.v=1692804565785",
  },
];

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Omit<Product, "id">) => {
    setProducts([...products, { id: Date.now().toString(), ...product }]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
