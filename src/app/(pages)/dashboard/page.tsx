"use client";

import AcceptMessagesToggleBtn from "@/components/Dashboard/AcceptMessagesToggleBtn";
import MessageCard from "@/components/Dashboard/MessageCard";
import { Message } from "@/models/UserModel";
import { ApiResponseType } from "@/types/ApiResponseType";
import axios from "axios";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const DashboardPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  let baseUrl = `${window.location.protocol}//${window.location.host}`;
  let profileUrl = `${baseUrl}/u/${user?.username}`;

  const handleGetMessages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<ApiResponseType>("/api/get-messages");
      setMessages(response.data.messages || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("URL copied 🎊");
  };

  const handleMessageDelete = async (messageId: unknown) => {
    setMessages(messages.filter((message) => message._id !== messageId));

    try {
      const response = await axios.delete(`/api/delete-message/${messageId}`);
      console.log(response);
      revalidatePath("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetMessages();
  }, []);

  return (
    <div className="w-full h-full  px-10 flex flex-col self-start py-10  ">
      <h1 className="text-4xl font-bold">User Dashboard</h1>
      <span className="text-zinc-700 font-medium text-lg mt-5">
        Copy your unique link
      </span>
      <div className="flex items-center justify-center gap-1">
        <div className="w-full py-3 px-4 bg-zinc-200 mt-2 font-medium">
          {profileUrl}
        </div>
        <button
          onClick={handleCopyToClipboard}
          className="py-3 px-4 rounded-md mt-2 bg-zinc-600 hover:bg-zinc-700 text-white font-semibold"
        >
          Copy
        </button>
      </div>

      <div className="mt-10 ">
        <AcceptMessagesToggleBtn />
      </div>

      <div className="border mt-5">Refresh</div>

      <div className="mt-10">
        {isLoading ? (
          <h1 className="text-center text-3xl font-bold">Loading...</h1>
        ) : (
          <div className="w-full flex items-center gap-2 flex-wrap">
            {messages ? (
              messages.map((message) => (
                <React.Fragment key={message._id as string}>
                  <MessageCard
                    messageContent={message.content}
                    messageId={message._id}
                    handleMessageDelete={handleMessageDelete}
                  />
                </React.Fragment>
              ))
            ) : (
              <h1>No Messages yet...</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
