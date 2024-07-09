import { NextResponse } from "next/server";

export const ResponseJson = (
  success: boolean,
  message: string,
  status: number
) => {
  return NextResponse.json(
    {
      success,
      message,
    },
    { status }
  );
};
