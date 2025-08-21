import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: number;
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    res.status(200).json({ id: 1, name: "John Doe" });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
