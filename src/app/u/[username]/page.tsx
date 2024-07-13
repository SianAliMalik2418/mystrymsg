"use client";

import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const PublicPage = ({ params }: { params: { username: string } }) => {
  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = form;

  const handleSendMessage = handleSubmit(async (data) => {
    console.log(data);

    try {
      const response = await axios.post("/api/send-message", {
        username,
        content: data.content,
      });

      console.log(response);
      toast.success("Message Sent!");
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 403) {
          toast.error("User is not accepting messages");
        }
      }
    }
  });

  return (
    <div className="flex flex-col w-full max-w-[70%] gap-3  justify-center">
      <h1 className="text-4xl font-bold text-center">Public Profile Page</h1>
      <span className="text-zinc-900 font-medium mt-10">
        Send Anonymous Message to @{username}
      </span>
      <form onSubmit={handleSendMessage} className="flex flex-col gap-4">
        <input
          {...register("content", {
            required: "Please enter message before sending",
          })}
          name="content"
          placeholder="Enter message..."
          className=" py-5 px-3 border-zinc-200 border"
        />
        {errors.content && (
          <span className="text-red-400 font-medium">
            {errors.content.message}
          </span>
        )}
        <button
          className="bg-zinc-700 text-white font-semibold py-4 px-6 rounded-md max-w-fit hover:bg-zinc-800 disabled:bg-zinc-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Annonymus Message"}
        </button>
      </form>
    </div>
  );
};

export default PublicPage;
