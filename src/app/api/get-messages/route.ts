import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { connectDB } from "@/lib/connectDB";
import { ResponseJson } from "@/lib/ResponseJson";
import { UserModel } from "@/models/UserModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const session = await getServerSession(authOptions);

  const userId = session?.user._id;

  if (!userId) {
    return ResponseJson(false, "Not authenticated", 400);
  }

  try {
    await connectDB();

    const mongooseObjectId = new mongoose.Types.ObjectId(userId);

    const user = await UserModel.aggregate([
      { $match: { _id: mongooseObjectId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!user || user.length === 0) {
      return ResponseJson(
        false,
        "User not found while trying to get messages",
        400
      );
    }

    console.log(user[0].messages);
    return NextResponse.json(
      { success: true, messages: user[0].messages },
      { status: 200 }
    );
  } catch (error) {
    console.log("SOMETHING WENT WRONG WHILE GETTING USER");
    return ResponseJson(false, "SOMETHING WENT WRONG WHILE GETTING USER", 500);
  }
};
