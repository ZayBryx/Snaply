import { getAllPayments } from "@/app/actions/payments";
import PaymentsTable from "@/components/payments/PaymentsTable";
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

const page = async () => {
  const session = await getSession();

  const payments = await getAllPayments();
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {session?.email || "Admin"}
        </p>
      </div>

      <PaymentsTable payments={payments} />
    </div>
  );
};

export default page;
