import { verify } from "crypto";
import {z} from "zod";

export const usernameValidation=
z.string().min(2,"Must be Graeter than 2 chracters")
.max(15,"not more than 15")
.regex(/^[a-zA-Z0-9_]+$/,"must not contain special charcter")

export const signUpSchema=z.object(
    {
        username: usernameValidation,
        // resusing the zod components
        email:z.string().email({message:"invalid email address"}),
        password:z.string().min(4,{message:"Must be greater than 4 characters"})
        
    }
)