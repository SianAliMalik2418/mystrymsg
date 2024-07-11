import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: [true, "Message content is required!"],
  },

  createdAt: {
    type: Date,
    required: [true, "Creation Date is required!"],
    default: Date.now,
  },
});

export interface User {
  username: string;
  email: string;
  password: string;
  verificationCode: string;
  verificationCodeExpiry: Date;
  isAcceptingMessages: boolean;
  isVerified: boolean;
  messages: Array<Message>;
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
  },

  email: {
    type: String,
    required: [true, "Email is required!"],
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
      "Please enter valid email address!",
    ],
  },

  password: {
    type: String,
    required: [true, "Password is required!"],
  },

  verificationCode: {
    type: String,
    required: [true, "Verification is required!"],
  },

  verificationCodeExpiry: {
    type: Date,
    required: [true, "Verification Code Expiry is required!"],
  },

  isVerified: {
    type: Boolean,
    default: false,
    required: [true, "Verification Code Expiry is required!"],
  },

  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },

  messages: [messageSchema],
});

export const UserModel =
  (mongoose.models.users as mongoose.Model<User>) ||
  mongoose.model<User>("users", UserSchema);
