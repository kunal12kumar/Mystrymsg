// in this we will defining for validation of otp

import {z} from "zod";

export const verifySchema =z.object({
    code:z.string().length(5, {message: "code should be at least of 5 character"})
})