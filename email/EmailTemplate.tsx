import * as React from "react";

interface EmailTemplateProps {
  username: string;
  verificationCode: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
  verificationCode,
}) => (
  <div>
    <h1>Welcome, {username}!</h1>
    <p>Here is your Verification Code: {verificationCode}</p>
  </div>
);
