"use client";

import { ApiResponseType } from "@/types/ApiResponseType";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

type Params = {
  username: string;
};

const VerificationPage = ({ params }: { params: Params }) => {
  const username = params.username;

  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await axios.post<ApiResponseType>(
        "/api/auth/verifyCode",
        { username, verificationCode }
      );

      toast.success(response.data.message);
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full ">
      <h1 className="text-4xl font-bold">Hello {username} 👋</h1>
      <span className="text-lg">
        Please enter verification code send to your email to verify
      </span>

      <form
        className=" max-w-[80%] space-y-3 mt-10"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          placeholder="Enter code"
          className="border border-zinc-600 py-3 px-5 w-full"
          onChange={(e) => setVerificationCode(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-red-500 px-7 text-white font-semibold py-3 disabled:bg-red-400 max-w-full whitespace-nowrap"
          disabled={isSubmitting}
        >
          {isSubmitting ? <>Verifying...</> : <>Verify</>}
        </button>
      </form>
    </div>
  );
};

export default VerificationPage;
