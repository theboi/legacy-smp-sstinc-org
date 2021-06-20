import { Page } from "@notionhq/client/build/src/api-types";
import axios from "axios";
import useSWR from "swr";
import { User } from "../../objects/user";

export const useUserWithHandle = (handle: string) => {
  const { data, error } = useSWR<Page, Error>(`/api/v1/user/${handle}`);
  const user = new User(null, data);
  return { user, error };
};
