import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helper/sendVerificationemail";

export async function POST(request:Request) {
    await dbconnect()

    try {
        //always waait
       const {email,username,password} =await  request.json()
       const existinguserVerificationByUsername=await UserModel.findOne(
        {
        username,
        isVerified:true
    } )
    if(existinguserVerificationByUsername)
        {
            return Response.json({
                success:false,
                message:"User Exists budd",


            },
            {
                status:400

            })
        }
       const existinguserbyemail=UserModel.findOne({email})
       if(await existinguserbyemail)
        {
            return true;
        }

        
    } catch (error) {
        console.log("object",error)
        return Response.json(
        {
            success:false,
            message:"errpr"
        },{
            status:500
        }
    )
    
        
    }
    
}

