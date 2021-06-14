import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { suffix } = req.query;
  res.status(200).json(suffix);
};
