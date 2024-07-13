import { connectDB } from "@/lib/connectDB";
import { ResponseJson } from "@/lib/ResponseJson";
import { UserModel } from "@/models/UserModel";

export const POST = async (request: Request) => {
  const { username, verificationCode } = await request.json();

  // Making sure all required fields are provided
  if (!username || !verificationCode) {
    return console.log("Required fields missing!");
  }

  try {
    await connectDB();

    const user = await UserModel.findOne({ username });

    if (!user) {
      return ResponseJson(false, "No user found with this username", 400);
    }

    if (user.isVerified) {
      return ResponseJson(false, "User is already verified", 400);
    }

    const isCodeValid = user.verificationCode === verificationCode;
    const isCodeNotExpired = new Date(user.verificationCodeExpiry) > new Date();

    if (isCodeNotExpired && isCodeValid) {
      user.isVerified = true;
      await user.save();
      return ResponseJson(true, "User verified successfully", 200);
    } else if (!isCodeNotExpired) {
      return ResponseJson(
        true,
        "Your code has expired. Sign up again to get a new code!",
        200
      );
    }

    return ResponseJson(
      true,
      "Invalid Code.Please recheck your code and try again!",
      400
    );
  } catch (error) {
    console.log("SOMETHING WENT WRONG WHILE SIGNING UP USER", error);
    return ResponseJson(
      false,
      "SOMETHING WENT WRONG WHILE VERIFYING USER WITH CODE",
      500
    );
  }
};
