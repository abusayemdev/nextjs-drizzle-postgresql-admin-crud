"use client";

import { useState } from "react";
import { createSupplier, updateSupplier, deleteSupplier } from "./actions";
import Link from "next/link";
import type { Supplier } from "@/lib/db/schema";


/* Types:
Props

*/

type Props = { suppliers: Supplier[] };


/* Varables: 
emptyForm

*/

const emptyForm = {
  ref: "",
  name: "",
  category: "other",
  contactPerson: "",
  phone: "",
  email: "",
  city: "",
  rating: 0,
  notes: "",
  status: "active",
};

export function SuppliersView({ suppliers: initialSuppliers }: Props) {

  /* useState Variables:
  suppliers
  form
  editingId
  showModal
  saving

  */

  const [suppliers, setSuppliers] = useState(initialSuppliers);

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [showModal, setShowModal] = useState(false);

  const [saving, setSaving] = useState(false);

  
  /* Functions:
   handleCreate
   handleEdit
   handleCloseModal
   handleDelete
   handleChange
   handleSubmit

  */

  // handleCreate
  function handleCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  // handleEdit
  function handleEdit(item: Supplier) {
    setEditingId(item.id);

    setForm({
      ref: item.ref,
      name: item.name,
      category: item.category,
      contactPerson: item.contactPerson,
      phone: item.phone,
      email: item.email,
      city: item.city,
      rating: item.rating,
      notes: item.notes,
      status: item.status,
    });

    setShowModal(true);
  }

  // handleCloseModal
  function handleCloseModal() {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(false);
  }

  // handleDelete
  async function handleDelete(id: number) {
    if (!window.confirm("Delete this supplier?")) {
      return;
    }

    await deleteSupplier(id);

    setSuppliers(suppliers.filter((item) => item.id !== id));
  }

  // handleChange: { name, value }, add in setForm
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "rating" ? Number(value) : value,
    });
  }

  // handleSubmit: setSaving(true), try { create | update }, handleCloseModal, finally { setSaving(false) }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSaving(true);

    try {
      if (editingId === null) {
        // create: newSupplier, add newSupplier in setSuppliers
        const newSupplier = await createSupplier(form);

        if (newSupplier) {
          setSuppliers([...suppliers, newSupplier]);
        }
      } else {
        // update: updateSupplier, update updatedSupplier in setSuppliers (map)
        const updatedSupplier = await updateSupplier(editingId, form);

        if (updatedSupplier) {
          setSuppliers(
            suppliers.map((item) =>
              item.id === editingId ? updatedSupplier : item,
            ),
          );
        }
      }

      handleCloseModal();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 px-4 py-3">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold"> Supplier Index </h1>

        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center px-6 py-3 rounded-md underline"
        >
          Create
        </button>
      </div>

      {/* Table */}
      <div className="min-w-full">
        <div className="border border-table-line rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-table-line">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-start text-xs font-bold text-muted-foreground-1 uppercase">
                  Name
                </th>

                <th className="px-6 py-3 text-start text-xs font-bold text-muted-foreground-1 uppercase">
                  Reference
                </th>

                <th className="px-6 py-3 text-start text-xs font-bold text-muted-foreground-1 uppercase">
                  Category
                </th>

                <th className="px-6 py-3 text-start text-xs font-bold text-muted-foreground-1 uppercase">
                  Phone
                </th>

                <th className="px-6 py-3 text-start text-xs font-bold text-muted-foreground-1 uppercase">
                  Email
                </th>

                <th className="px-6 py-3 text-start text-xs font-bold text-muted-foreground-1 uppercase">
                  City
                </th>

                <th className="px-6 py-3 text-end text-xs font-bold text-muted-foreground-1 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-table-line">
              {suppliers.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {item.name}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {item.ref}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {item.category}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {item.phone}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {item.email}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {item.city}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="inline-flex items-center m-1 text-sm font-semibold text-primary hover:text-primary-hover underline cursor-pointer"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-hover underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-background border border-table-line shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-table-line">
              <h2 className="text-lg font-semibold">
                {editingId === null ? "Create Supplier" : "Edit Supplier"}
              </h2>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={saving}
                className="text-xl cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Reference */}
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Reference
                  </label>

                  <input
                    name="ref"
                    value={form.ref}
                    onChange={handleChange}
                    required
                    className="w-full border border-table-line rounded-md px-3 py-2 bg-background"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="block mb-1 text-sm font-medium">Name</label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-table-line rounded-md px-3 py-2 bg-background"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Category
                  </label>

                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border border-table-line rounded-md px-3 py-2 bg-background"
                  />
                </div>

                {/* Contact Person */}
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Contact Person
                  </label>

                  <input
                    name="contactPerson"
                    value={form.contactPerson}
                    onChange={handleChange}
                    className="w-full border border-table-line rounded-md px-3 py-2 bg-background"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Phone
                  </label>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-table-line rounded-md px-3 py-2 bg-background"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-table-line rounded-md px-3 py-2 bg-background"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block mb-1 text-sm font-medium">City</label>

                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border border-table-line rounded-md px-3 py-2 bg-background"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Rating
                  </label>

                  <input
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    value={form.rating}
                    onChange={handleChange}
                    className="w-full border border-table-line rounded-md px-3 py-2 bg-background"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border border-table-line rounded-md px-3 py-2 bg-background"
                  >
                    <option value="active">Active</option>

                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                  <label className="block mb-1 text-sm font-medium">
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-table-line rounded-md px-3 py-2 bg-background"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-table-line">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={saving}
                  className="px-5 py-2 rounded-md border border-table-line"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-md"
                >
                  {saving
                    ? "Saving..."
                    : editingId === null
                      ? "Create"
                      : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Link
            href="/admin/dashboard"
            className="inline-flex items-center px-3 py-3 border border-transparent text-base font-medium rounded-md underline "
          >
            Back
          </Link>
    </div>
  );
}
