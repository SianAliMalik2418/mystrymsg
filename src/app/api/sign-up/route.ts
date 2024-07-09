import { connectDB } from "@/lib/connectDB";
import { UserModel } from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationMail";
import { ResponseJson } from "@/lib/ResponseJson";

export const POST = async (request: Request) => {
  await connectDB();

  try {
    const { username, email, password } = await request.json();

    // Making sure all required fields are provided
    if (!username || !email || !password) {
      return console.log("User credentials fields missing!");
    }

    // Checking if username entered is not already taken by a verified User.
    const existingUserByUsernameVerified = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserByUsernameVerified) {
      ResponseJson(false, "Username is already taken", 400);
    }

    // Checking if the email is unique or not
    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        ResponseJson(false, "User already exists. Please Login", 400);
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);

        const verificationCode = Math.floor(Math.random() * 90000).toString();
        const verificationCodeExpiry = new Date(Date.now() + 3600000);

        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verificationCode = verificationCode;
        existingUserByEmail.verificationCodeExpiry = verificationCodeExpiry;

        await existingUserByEmail.save();
      }
    } else {
      // Saving the user in db if email is unique.
      const hashedPassword = bcrypt.hashSync(password, 10);

      const verificationCode = Math.floor(Math.random() * 90000);

      const verificationCodeExpiry = new Date();
      verificationCodeExpiry.setHours(verificationCodeExpiry.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verificationCode: verificationCode,
        verificationCodeExpiry,
        isAcceptingMessages: true,
        isVerified: false,
        messages: [],
      });

      await newUser.save();

      ResponseJson(true, "User created successfully.", 201);
    }

    const verificationEmail = await sendVerificationEmail(username, email);

    if (!verificationEmail.success) {
      console.log("Err while sending mail");
    } else {
      ResponseJson(true, "Mail Sent, Please enter verification code.", 200);
    }
    
  } catch (error) {
    console.log("SOMETHING WENT WRONG WHILE SIGNING UP USER", error);
    ResponseJson(false, "SOMETHING WENT WRONG WHILE SIGNING UP USER", 500);
  }
};
