import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;

    // ✅ Check if token exists
    if (!token) {
      throw new Error("Token not found");
    }

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    // Optional: Customize message or log for debugging
    throw new Error(error.message || "Invalid or missing token");
  }
};
