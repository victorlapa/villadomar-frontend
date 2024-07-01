import { ProductType } from '@/types/productType';

export type Field = {
    name: string;
    type: string;
    placeholder?: string;
    values?: any[];
    className?: string; // Add className property
    id: string;
}
