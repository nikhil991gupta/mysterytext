import {z} from 'zod'

export const verifySchema=
z.string().length(6,{message:"Verification Code must be of  6 numbers"}
)