// File location: /src/app/admin/layout.tsx

import { Sidebar } from "@/components/admin/Sidebar";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function getSession() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("user_session");

    if (!session) return null;

    return JSON.parse(session.value);
  } catch {
    return null;
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Check if user is logged in and is admin
  if (!session || session.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
    </div>
  );
}
