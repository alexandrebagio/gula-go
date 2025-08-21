import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200);
  res.setHeader(
    "Set-Cookie",
    "XSRF-TOKEN=your_csrf_token; Path=/; HttpOnly; SameSite=Strict"
  );
  res.end();
}
