import { NextApiRequest, NextApiResponse } from "next";
import { privateInfo } from "../../server/data/private_info";

export type PrivateInfoResponseType =
  | {
      success: false;
      reason: string;
    }
  | {
      success: true;
      info: typeof privateInfo;
    };

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<PrivateInfoResponseType>
) => {
  if (req.method !== "GET")
    return res
      .status(405)
      .json({ success: false, reason: "This method is not supported!" });

  const { pin } = req.query;
  if (!pin || pin !== process.env.PIN)
    return res
      .status(403)
      .json({ success: false, reason: "Incorrect pin code!" });

  return res.status(200).json({
    success: true,
    info: privateInfo,
  });
};

export default handler;
