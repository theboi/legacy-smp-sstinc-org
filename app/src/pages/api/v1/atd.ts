import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { suffix },
  } = req;
  res.status(200).json(suffix);
};
