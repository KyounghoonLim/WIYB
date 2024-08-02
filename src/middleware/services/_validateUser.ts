import { NextRequest } from "next/server";
import { myFetch } from "./myFetch";
import { SERVICE_PATH } from "@/src/constants/path.constant";

export { _validateUser };

async function _validateUser(req: NextRequest) {
  const res = await myFetch(SERVICE_PATH.GET_USER, {
    headers: {
      cookie: req.cookies.toString(),
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw undefined;
  }
}
