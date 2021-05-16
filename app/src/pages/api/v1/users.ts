import { NextApiResponse, NextApiRequest } from "next";
import { provider } from "../../../model/provider";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const output = (await provider.atd.allUsers()).docs.map((value) => ({
    /**
     * Forces data.date to SGT time format. If excluded, time will
     * be shown in UTC during production.
     */
    timestamp: value
      .data()
      .timestamp.toDate()
      .toLocaleString("en-SG", { timeZone: "Asia/Singapore" }),
    email: value.data().email,
    iid: value.data().iid,
    displayName: value.data().displayName,
  }));
  res.status(200).json(output);
};
