import { Page } from "@notionhq/client/build/src/api-types";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { User } from "../objects/user";
import axios from "axios";

const AtdContext = createContext(null);

export const AtdProvider = (props) => {
  const value = {
    signIn: props.takeAttendance || takeAttendance,
  };

  return (
    <AtdContext.Provider value={value}>{props.children}</AtdContext.Provider>
  );
};

export const useAtd = () => {
  const [user, setUser] = useState<User>();
  const [email, setEmail] = useState<string>();

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR<Page, Error>(`/api/v1/atd/${email}`, fetcher);

  return { Atd: useContext(AtdContext), user: user, error: error };
};

async function takeAttendance(email, code) {}
