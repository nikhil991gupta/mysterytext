import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerifiactionEmail";
import { ApiResponse } from "@/types/ApiAResponse";
import exp from "constants";
import { verify } from "crypto";
import { scheduler } from "timers/promises";

export async function sendVerificationEmail(
    username:string,
    email:string,

    verifycode:string,




) :Promise<ApiResponse>
{
    try{
        await resend.emails.send({
            from: 'onboarding.resend.dev',
            to:email ,
            subject:'Mystery Text Verfication' ,
            react:VerificationEmail({
                username,otp:verifycode
            }),
        })
        return {
            success:true,message:" email send"
        }

    }catch(emailError)
    {
        console.log("Error send Verification Email",emailError)
    }
    return {
        success:true,message:"Failed to send"
    }

}
