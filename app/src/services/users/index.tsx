import { Page } from "@notionhq/client/build/src/api-types";
import axios from "axios";
import useSWR from "swr";
import { User } from "../../objects/user";

async function takeAttendance(email, code) {
  axios.get("/api/v1/atd").then((res) => res.data);
}

export const useUserWithHandle = (handle: string) => {
  const { data, error } = useSWR<Page, Error>(`/api/v1/user/${handle}`);
  const user = new User(null, data);
  return { user, error };
};
