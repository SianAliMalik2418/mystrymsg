import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(2, { message: "Username must be greater than 2 characters." })
  .max(20, { message: "Username must be maximun 20 characters." });

export const signUpSchema = z.object({
  username: userNameValidation,
  email: z
    .string()
    .email({ message: "Invalid Email address." })
    .regex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/, {
      message: "Email must not contain special characters.",
    }),

  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long" }),
});
