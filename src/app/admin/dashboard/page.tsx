import { cookies } from "next/headers";
import { getAllUsers, getUserStats } from "@/app/actions/users";
import UserTable from "@/components/dashboard/UserTable";

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

export default async function AdminDashboard() {
  const session = await getSession();

  const users = await getAllUsers(session?._id);
  const stats = await getUserStats();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {session?.email || "Admin"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats.totalUsers}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {stats.adminCount} admins, {stats.userCount} users
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">
            Business Accounts
          </h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats.usersWithBusiness}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Templates</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats.templatesCount}
          </p>
        </div>
      </div>
      <UserTable users={users} />
    </div>
  );
}
