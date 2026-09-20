'use server';

import { db } from '@/lib/db';
import { supplier } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function getSuppliers() {
  return await db
    .select()
    .from(supplier);
}

export async function getSupplier(id: number) {
  const [item] = await db
    .select()
    .from(supplier)
    .where(eq(supplier.id, id));

  return item;
}

export async function createSupplier(data: {
  ref: string;
  orgId?: number;
  name: string;
  category?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  city?: string;
  rating?: number;
  notes?: string;
  status?: string;
}) {
  const [item] = await db
    .insert(supplier)
    .values({
      ref: data.ref,
      orgId: data.orgId ?? 1,
      name: data.name,
      category: data.category ?? 'other',
      contactPerson: data.contactPerson ?? '',
      phone: data.phone ?? '',
      email: data.email ?? '',
      city: data.city ?? '',
      rating: data.rating ?? 0,
      notes: data.notes ?? '',
      status: data.status ?? 'active',
    })
    .returning();

  return item;
}

export async function updateSupplier(
  id: number,
  data: {
    ref: string;
    orgId?: number;
    name: string;
    category?: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
    city?: string;
    rating?: number;
    notes?: string;
    status?: string;
  }
) {
  const [item] = await db
    .update(supplier)
    .set({
      ref: data.ref,
      orgId: data.orgId ?? 1,
      name: data.name,
      category: data.category ?? 'other',
      contactPerson: data.contactPerson ?? '',
      phone: data.phone ?? '',
      email: data.email ?? '',
      city: data.city ?? '',
      rating: data.rating ?? 0,
      notes: data.notes ?? '',
      status: data.status ?? 'active',
      updatedAt: new Date(),
    })
    .where(eq(supplier.id, id))
    .returning();

  return item;
}

export async function deleteSupplier(id: number) {
  const [item] = await db
    .delete(supplier)
    .where(eq(supplier.id, id))
    .returning();

  return item;
}