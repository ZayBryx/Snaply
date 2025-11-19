import { getAllAffiliate } from "@/app/actions/affiliate";
import AffiliateTable from "@/components/affiliates/AffiliateTable";
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

  const affiliates = await getAllAffiliate();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Affiliates</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {session?.email || "Admin"}
        </p>
      </div>

      {/* <AffiliateTable data={affiliates} /> */}
      <AffiliateTable affiliates={affiliates} />
    </div>
  );
};

export default page;
