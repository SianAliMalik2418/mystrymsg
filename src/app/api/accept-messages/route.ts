import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { ResponseJson } from "@/lib/ResponseJson";
import { connectDB } from "@/lib/connectDB";
import { UserModel } from "@/models/UserModel";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const { isAcceptingMessages } = await request.json();
    console.log(isAcceptingMessages)
    const session = await getServerSession(authOptions);

    const sessionUser = session?.user;

    if (!sessionUser || !session) {
      return ResponseJson(false, "Not authenticated", 400);
    }

    await connectDB();

    const user = await UserModel.findById(sessionUser._id);

    if (!user) {
      return ResponseJson(false, "No user found!", 404);
    }

    user.isAcceptingMessages = isAcceptingMessages;
    user.save();

    return ResponseJson(true, `${user}`, 200);
  } catch (error) {
    console.log("SOMETHING WENT WRONG WHILE UPDATING MESSAGE STATUS!", error);
    return ResponseJson(
      false,
      "SOMETHING WENT WRONG WHILE UPDATING MESSAGE STATUS!",
      500
    );
  }
};

export const GET = async (request: Request) => {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    const sessionUser = session?.user;

    if (!sessionUser || !session) {
      return ResponseJson(false, "Not authenticated", 400);
    }

    const user = await UserModel.findById(sessionUser._id);

    if (!user) {
      return ResponseJson(false, "No user found!", 404);
    }

    return NextResponse.json(
      {
        success: true,
        isAcceptingMessages: user.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("SOMETHING WENT WRONG WHILE UPDATING MESSAGE STATUS!", error);
    return ResponseJson(
      false,
      "SOMETHING WENT WRONG WHILE UPDATING MESSAGE STATUS!",
      500
    );
  }
};
