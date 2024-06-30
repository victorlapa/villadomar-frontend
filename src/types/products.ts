import { SupplierProduct } from '@/types/supplierProduct';

export type Product = {
  product: {
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
  totalAmount: number;
};
