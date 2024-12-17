// export interface UserInfo {
//     id: string;
//     name: string;
//     avatar: string;
//     openid: string;
// }
import { Database } from "../utils/types/database.types";

export type UserInfo = Database["public"]["Tables"]["user_info"]["Row"];
