import mongoose, {Schema,Document} from "mongoose";

export interface Message extends Document{
content:string;  
// in typescript
createdAt:Date;
}
const MessageSchema:Schema<Message>=new Schema(

    {
        content:{
            type: String,
            required:true
        },
        createdAt:{
            type: Date,
            required:true,
            default:Date.now

        }



    }
)
export interface User extends Document{
    username:string;  
    // in typescript
    email:string;  
    password:string;  

    verifycode:string;  
    verifycodeexpiry:Date;
    isVerified:Boolean;
    isAcceptingmessage:Boolean;
    messages:Message[];
    }

    const UserSchema:Schema<User>=new Schema(

        {
            username:{
                type: String,
                required:[true,"Username is required"],
                trim:true,
                unique:true
            },
            email:{
                type: String,
                required:true,
                unique:true,
                match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Please enter valid Email']
            },
            verifycode:{
                type: String,
                required:[true,"verifycode is required"],
            },
            verifycodeexpiry:{
                type: Date,
                required:[true,"verifycodeexpiry is required"],
            }
            ,
            isVerified:{
                type:Boolean,
                required:true

            },
            isAcceptingmessage:{
                type: Boolean,
                required:true,
            },
            messages:{
                type:[MessageSchema]
            }
    
    
    
        }
    )

    const UserModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model("User",UserSchema)

    export default UserModel;