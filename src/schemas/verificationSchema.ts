import { z } from "zod";

export const verificationSchema = z.object({
    code : z.string().length(6 , {message : "Code should be of 6 digits,"})
})