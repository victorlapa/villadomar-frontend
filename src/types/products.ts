import { SupplierProduct } from "@/types/supplierProduct";

export type ProductResponse = {
  product: Product;
  totalAmount: number;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  value: number;
  weight: number;
  typeProductId: number;
  typeProduct: string;
  supplierProductId: number;
  supplierProduct: SupplierProduct;
};
