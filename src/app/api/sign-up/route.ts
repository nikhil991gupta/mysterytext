import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helper/sendVerificationemail";

export async function POST(request:Request) {
    await dbconnect()

    try {
        //always waait
       const {email,username,password} =await  request.json()
       // to check 
       const existinguserVerificationByUsername=await UserModel.findOne(
        {
        username,// find user name if it is already verified by username
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
       const verifyCode=Math.floor(100000+Math.random() * 900000).toString();
       if( existinguserbyemail)
        { 
            return true;
        }
        else{
            // entered else means first time user
            //existing user by mail not found so  register
            const hashedpasswrod=await bcrypt.hash(password,10)
            // object rederence pount so the value can change
            const expiryDate=new Date()
            expiryDate.setHours(expiryDate.getHours()+1)
        const newUser= new UserModel({
                username,
                email,
                password:hashedpasswrod,
                verifyCode,
                expiryDate,    
                isVerified:false,
                isAcceptingmessage:true,
                messages:[],
                
            })
            await newUser.save()

        }  

    //Send verificaion email

const emailresponse=await sendVerificationEmail(
    email,
    username,
    verifyCode,
)
if(!emailresponse.success)
{
   return Response.json({
    success:false,
    message:`Email not sent ${ emailresponse.message}`,
   },
    {
        status:500

    }
   )
}
return Response.json({
    success:true,
    message:"Registered Sucessfully.Kinly Verify Your Email", 
   },{
    status:200
   })
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

