import {z} from 'zod'

export const messageSchema=
z.object(
    {
        content:z.string()
        .min(10,{message:"Must Be greater than 10 characters"})
        .max(250,{message:"Not greater thwn 250"})


    }
)