import { cookies } from "next/headers";
import { getAllBusinesses } from "@/app/actions/business";
import BusinessTable from "@/components/business/table/business";

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

export default async function BusinessDashboard() {
  const session = await getSession();

  const businesses = await getAllBusinesses();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Businesses</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {session?.email || "Admin"}
        </p>
      </div>

      <BusinessTable data={businesses} />
    </div>
  );
}
