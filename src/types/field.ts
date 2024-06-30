import { ProductType } from '@/types/productType';

export type Field = {
    name: string;
    type: string;
    placeholder?: string;
    values?: ProductType[];
    className?: string; // Add className property
}
