import { getAllAffiliate } from "@/app/actions/affiliate";
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

  return <div>page</div>;
};

export default page;
