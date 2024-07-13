import { connectDB } from "@/lib/connectDB";
import { ResponseJson } from "@/lib/ResponseJson";
import { Message, UserModel } from "@/models/UserModel";

export const POST = async (request: Request) => {
  await connectDB();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return ResponseJson(false, "User not found for sending message", 404);
    }

    if (!user.isAcceptingMessages) {
      return ResponseJson(false, "User is not accepting messages", 403);
    }

    const newMessage = {
      content,
      createdAt: new Date(),
    };

    user.messages.push(newMessage as Message);

    user.save();

    return ResponseJson(
      true,
      `Message sent successfully ${user.messages}`,
      200
    );
  } catch (error) {
    console.log("SOMETHING WENT WRONG WHILE GETTING USER");
    return ResponseJson(
      false,
      "SOMETHING WENT WRONG WHILE SENDING MESSAGE USER",
      500
    );
  }
};
