import type { Metadata } from "next";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Secure login for the Mobiz Car Rental admin dashboard.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-sand/50 px-4 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-line bg-white p-8 shadow-sm">
          <div className="text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-ink text-gold">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M6 11h12a1 1 0 011 1v7a1 1 0 01-1 1H6a1 1 0 01-1-1v-7a1 1 0 011-1z" />
              </svg>
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold text-ink">
              Admin Login
            </h1>
            <p className="mt-1 text-sm text-ink/55">
              Sign in to manage the Mobiz fleet.
            </p>
          </div>

          <div className="mt-8">
            <AdminLoginForm />
          </div>

          <div className="mt-6 rounded-lg border border-line bg-sand/50 p-4 text-xs text-ink/60">
            <p className="font-semibold text-ink/80">Demo credentials</p>
            <p className="mt-1">Email: test.mobiz.mu@gmail.com</p>
            <p>Password: MobizTest1</p>
            <p className="mt-2 text-ink/45">
              Temporary demo authentication — move to a database for production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
