import { cookies } from "next/headers";
import { getAllTemplates } from "@/app/actions/templates";
import TemplateTable from "@/components/template/TemplateTable";

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

export default async function Templates() {
  const session = await getSession();
  const templates = await getAllTemplates();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {session?.email || "Admin"}
        </p>
      </div>

      <TemplateTable data={templates} />
    </div>
  );
}
