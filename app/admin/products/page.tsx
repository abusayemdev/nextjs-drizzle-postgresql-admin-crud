import type { Metadata } from 'next';
import { ProductsView } from './products-view'

export const metadata: Metadata = {
  title: 'Products',
};

export default async function ProductsPage() {
  return <ProductsView />;
}