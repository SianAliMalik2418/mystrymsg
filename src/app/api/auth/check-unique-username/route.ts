import { connectDB } from "@/lib/connectDB";
import { ResponseJson } from "@/lib/ResponseJson";
import { UserModel } from "@/models/UserModel";
import { userNameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const UsernameQuerySchema = z.object({
  username: userNameValidation,
});

export const GET = async (request: Request) => {

   
  await connectDB();

  try {
    const url = new URL(request.url);

    const { searchParams } = url;
    const queryParam = {
      username: searchParams.get("username"),
    };

    const result = UsernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      // { success: false, error: [Getter] }
      // [ 'Username must be greater than 2 characters.' ]

      return ResponseJson(
        false,
        `${
          usernameErrors.length > 0
            ? usernameErrors.join("', ")
            : "Invalid query params"
        }`,
        400
      );
    }

    const { username } = result.data;

    const existingVerifiedUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUsername) {
      return ResponseJson(false, `Username is already taken.`, 400);
    }

    return ResponseJson(true, `Username is available.`, 200);
  } catch (error) {
    console.log(error);
    return ResponseJson(false, "Something went wrong", 500);
  }
};
