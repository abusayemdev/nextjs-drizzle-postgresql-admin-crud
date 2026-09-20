import Link from "next/link";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="min-h-screen flex items-center justify-center  from-blue-50 to-indigo-100">
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome Admin
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Admin with Next.js, Drizzle, and PostgreSQL
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-700"
              >
                Go to Dashboard
              </Link>

              <Link
                href="/profile"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-700"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Create Account
              </Link>
            </>
          )}
        </div>

        {session && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">
              Logged in as: <strong>{session.user.email}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}