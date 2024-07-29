import { DateFormatType } from "./date.types";
import { GenderType } from "./gender.types";

export { User };

interface User {
  id: string;
  nickname: string;
  gender: GenderType;
  birth: DateFormatType;
  image_url: string;
  created_at: DateFormatType;
}
