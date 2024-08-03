import { atom } from "recoil";
import { User } from "../@types/user.interface";

export { userState };

const userState = atom<User>({
  key: "USER",
  default: undefined,
});
