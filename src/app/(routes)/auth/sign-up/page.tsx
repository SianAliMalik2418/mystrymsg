"use client";

import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

import axios from "axios";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "@/schemas/signUpSchema";

import { ApiResponseType } from "../../../../types/ApiResponseType";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameCheckMessage, setUsernameCheckMessage] = useState("");

  const debounced = useDebounceCallback(setUsername, 500);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleSignUp = handleSubmit(async (data) => {
    console.log(data);

    try {
      const response = await axios.post<ApiResponseType>(
        "/api/auth/sign-up",
        data
      );
      toast.success("Sign Up Successful");
      console.log(response);
      router.push(`/auth/verify/${username}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  });

  useEffect(() => {
    const handleCheckUsernameUniqueness = async () => {
      try {
        if (username) {
          setIsCheckingUsername(true);
          const response = await axios.get<ApiResponseType>(
            `/api/auth/check-unique-username?username=${username}`
          );
          setUsernameCheckMessage(response.data.message);
          console.log(response);
        }
      } catch (error) {
        console.log(error);

        if (axios.isAxiosError(error) && error.response) {
          setUsernameCheckMessage(error.response.data.message);
        }
      } finally {
        setIsCheckingUsername(false);
      }
    };

    handleCheckUsernameUniqueness();
  }, [username]);

  return (
    <div className="flex items-center justify-center flex-col gap-5 w-full py-20">
      <h1 className="font-bold text-4xl">Sign Up</h1>
      <form
        onSubmit={handleSignUp}
        className="w-[60%] h-[70%]  py-4 flex flex-col  items-center justify-center gap-10"
      >
        <div className="w-full ">
          <label
            htmlFor="username"
            className="flex  justify-center flex-col gap-2 font-semibold text-lg"
          >
            Username
            <input
              type="text"
              placeholder="Enter username..."
              className="py-4 px-3 border-4"
              {...register("username", {
                onChange: (e) => debounced(e.target.value),
              })}
            />
            {isCheckingUsername ? (
              <span className="text-sm text-zinc-500">Loading...</span>
            ) : (
              <span
                className={`text-sm   ${
                  usernameCheckMessage === "Username is available."
                    ? "text-green-500"
                    : "text-red-400"
                }`}
              >
                {usernameCheckMessage}
              </span>
            )}
          </label>
        </div>
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
          {isSubmitting ? <>Signing Up...</> : <>Sign Up</>}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
