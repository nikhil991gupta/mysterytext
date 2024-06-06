import {z} from 'zod'

export const acceptMessageszschema=
z.object(
    {
        message:z.boolean()

    }
)