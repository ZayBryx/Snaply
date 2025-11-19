import axios from "@/lib/axios";

export const populateContentCalendar = async (businessAccountId: string) => {
  return await axios.post("/content-calendar/populate", {
    business_account_id: businessAccountId,
  });
};

export const addContentCalendar = async (businessAccountId: string) => {
  return await axios.post("/content-calendar", {
    business_account_id: businessAccountId,
  });
};

export const getContentCalendar = async (businessAccountId: string) => {
  return await axios.get("/content-calendar", {
    params: { business_account_id: businessAccountId },
  });
};
