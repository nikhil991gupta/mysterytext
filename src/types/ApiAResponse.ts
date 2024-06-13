//mainly start with interfaces and boolean
import { Message } from "@/models/User";

export interface ApiResponse{
    success:boolean;
    message:string;
    isAcceptingMessages?:boolean;
    messages?: Array<Message>;

}