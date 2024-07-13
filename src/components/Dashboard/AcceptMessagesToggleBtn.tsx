"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { acceptingMessagesSchema } from "@/schemas/acceptingMessagesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const AcceptMessagesToggleBtn = () => {
  const form = useForm({
    resolver: zodResolver(acceptingMessagesSchema),
    defaultValues: {
      isAcceptingMessages: true,
    },
  });

  const { watch, register, setValue } = form;
  const isAcceptingMessages = watch("isAcceptingMessages");

  const handleCheckIsAcceptingMessages = async () => {
    try {
      const response = await axios.get("/api/accept-messages");
      setValue("isAcceptingMessages", response.data.isAcceptingMessages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeIsAcceptingMessages = async (newValue: boolean) => {
    try {
      const response = await axios.post("/api/accept-messages", {
        isAcceptingMessages: newValue,
      });
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    handleCheckIsAcceptingMessages();
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="airplane-mode"
        {...register("isAcceptingMessages")}
        onClick={() => {
          const newValue = !isAcceptingMessages;
          setValue("isAcceptingMessages", newValue);
          handleChangeIsAcceptingMessages(newValue);
        }}
        checked={isAcceptingMessages}
      />
      <Label htmlFor="airplane-mode" className="text-lg">
        Accept Messages: {isAcceptingMessages ? "On" : "Off"}
      </Label>
    </div>
  );
};

export default AcceptMessagesToggleBtn;
