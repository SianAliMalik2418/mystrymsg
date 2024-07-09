import { resend } from "@/lib/resendEmailConfig";
import { ApiResponseType } from "@/types/ApiResponseType";
import { EmailTemplate } from "../../email/EmailTemplate";

export const sendVerificationEmail = async (
  email: string,
  username: string
): Promise<ApiResponseType> => {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "MysterMsg | Verification Email",
      text: `Welcome ${username}`,
      react: EmailTemplate({ username }),
    });
    return { success: true, message: "Mail sent to ur email!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to send email!" };
  }
};
