import type { Metadata } from 'next';
import { ClientsView } from './clients-view'

export const metadata: Metadata = {
  title: 'Clients',
};

export default async function ClientsPage() {
  return <ClientsView />;
}