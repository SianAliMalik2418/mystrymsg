import { Message } from "@/models/UserModel";

export interface ApiResponseType {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: Array<Message>;
}
