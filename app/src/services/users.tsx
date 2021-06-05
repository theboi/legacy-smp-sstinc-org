import { Client } from "@notionhq/client/build/src";
import { Page } from "@notionhq/client/build/src/api-types";
import { createContext, useContext } from "react";

const UsersContext = createContext(null);

export const UsersProvider = (props) => {
  const value = {
    getUsers: props.getUsers || getUsers,
    getUser: props.getUser || getUser,
    getPrivacyPolicy: props.getPrivacyPolicy || getPrivacyPolicy,
  };

  return (
    <UsersContext.Provider value={value}>
      {props.children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  return useContext(UsersContext);
};

/** Call in getServerSideProps() only */
async function getUsers(): Promise<Page[]> {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response = await notion.databases.query({
    database_id: "06bf6e5705da456aa04f99af5f9ee5b8",
  });
  console.log(response.results);
  return response.results;
}

/** Call in getServerSideProps() only */
async function getUser(email: string): Promise<Page> {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response = await notion.databases.query({
    database_id: "06bf6e5705da456aa04f99af5f9ee5b8",
    filter: {
      property: "Email",
      text: {
        equals: email,
      },
    },
  });
  console.log(response.results[0]);
  return response.results[0];
}

async function getPrivacyPolicy(): Promise<string> {
  return "hello";
}
