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
       const existinguserbyemail=await UserModel.findOne({email})
       if( existinguserbyemail)
        {
            return true;
        }
        else{
            //existing user by mail not found sor register
            const hashedpasswrod=await bcrypt.hash(password,10)
            // object rederence pount so the value can change
            const expiryDate=new Date()
            expiryDate.setDate(expiryDate.getDate()+1)
            new UserModel({
                username,
                email,
                password:hashedpasswrod,
                
            })

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

