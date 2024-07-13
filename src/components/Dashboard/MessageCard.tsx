"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type MessageCardProps = {
  messageContent: string;
  messageId: unknown;
  handleMessageDelete: (messageId: unknown) => void;
};

const MessageCard = ({
  messageContent,
  messageId,
  handleMessageDelete,
}: MessageCardProps) => {
  return (
    <div className="w-[33rem] h-[10rem] px-5 py-5 border-2 border-zinc-200 flex flex-col">
      <div className="flex items-center w-full justify-between">
        <h1 className="text-2xl font-semibold truncate max-w-[25rem]">
          {messageContent}
        </h1>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="bg-red-500 text-white font-semibold w-12 h-10 text-lg hover:bg-red-600 rounded-md text-center ">
              X
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                message from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600"
                onClick={() => handleMessageDelete(messageId)}
              >
                Delete Message
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <span className="mt-3">Jul 13, 2024 6:29 AM</span>
    </div>
  );
};

export default MessageCard;
