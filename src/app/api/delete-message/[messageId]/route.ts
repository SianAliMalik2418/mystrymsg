import { connectDB } from "@/lib/connectDB";
import { UserModel } from "@/models/UserModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { ResponseJson } from "@/lib/ResponseJson";

type Params = {
  messageId: string;
};
export const DELETE = async (
  request: Request,
  { params }: { params: Params }
) => {
  const messageId = params.messageId;


  const session = await getServerSession(authOptions);

  const userId = session?.user._id;

  if (!userId) {
    return ResponseJson(false, "Not authenticated", 400);
  }
  try {
    await connectDB();

    const updatedResult = await UserModel.updateOne(
      { _id: userId },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updatedResult.modifiedCount === 0) {
      return ResponseJson(
        false,
        "Error deleting message either it was deleted or was not found!",
        404
      );
    }
    return ResponseJson(true, "Message Deleted", 200);

    
  } catch (error) {
    console.log(error);
    console.log("SOMETHING WENT WRONG WHILE DELETING MESSAGE");
    return ResponseJson(
      false,
      "SOMETHING WENT WRONG WHILE DELETING MESSAGE",
      500
    );
  }
};
