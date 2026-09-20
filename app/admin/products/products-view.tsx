"use client";

import Link from "next/link";

export function ProductsView() {

  return (
    <div className="space-y-6 px-4 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold"> Products </h1>

        </div>

        <Link
          href="/admin/dashboard"
          className="inline-flex items-center px-3 py-3 border border-transparent text-base font-medium rounded-md underline "
        >
          Back
        </Link>
    </div>
  );
}
