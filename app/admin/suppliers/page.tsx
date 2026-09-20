import type { Metadata } from 'next';
import { getSuppliers } from './actions';
import { SuppliersView } from './suppliers-view';

export const metadata: Metadata = {
  title: 'Admin | Supplier',
};

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();
  return <SuppliersView suppliers={suppliers} />;
}