"use client";

import axios from "axios";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "sonner";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
import { ApiResponseType } from "@/types/ApiResponseType";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = handleSubmit(async (data) => {
    console.log(data);

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (response?.error) {
        toast.error(response.error);
        throw new Error();
      }
      toast.success("Sign In Successful");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  });

  return (
    <div className="flex items-center justify-center flex-col gap-5 w-full py-20">
      <h1 className="font-bold text-4xl">Sign In</h1>
      <form
        onSubmit={handleSignIn}
        className="w-[60%] h-[70%]  py-4 flex flex-col  items-center justify-center gap-10"
      >
        <div className="w-full ">
          <label
            htmlFor="email"
            className="flex  justify-center flex-col gap-2 font-semibold text-lg"
          >
            Email
            <input
              type="text"
              placeholder="Enter email..."
              className="py-4 px-3 border-4"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-sm text-red-400">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>
        <div className="w-full ">
          <label
            htmlFor="password"
            className="flex  justify-center flex-col gap-2 font-semibold text-lg"
          >
            Password
            <input
              type="text"
              placeholder="Enter password..."
              className="py-4 px-3 border-4"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-sm text-red-400">
                {errors?.password.message}
              </span>
            )}
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-zinc-800 text-white font-semibold py-4 hover:bg-zinc-900 disabled:bg-zinc-600"
        >
          {isSubmitting ? <>Signing In...</> : <>Sign In</>}
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
