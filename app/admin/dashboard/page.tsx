import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
     

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user.name || user.email}
              </span>

              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>



      <div className="max-w-7xl mx-auto py-3 sm:px-6 lg:px-8">
        <div className="px-4 py-3 sm:px-0">
          <Link
            href="/admin/suppliers"
            className="inline-flex items-center px-3 py-3 border border-transparent text-base font-medium rounded-md underline "
          >
            Suppliers
          </Link>
          
     
          <Link
            href="/admin/products"
            className="inline-flex items-center px-3 py-3 border border-transparent text-base font-medium rounded-md underline "
          >
            Products
          </Link>
   
          <Link
            href="/admin/clients"
            className="inline-flex items-center px-3 py-3 border border-transparent text-base font-medium rounded-md underline "
          >
            Clients
          </Link>
          
        </div>
      </div>
    </div>
  );
}