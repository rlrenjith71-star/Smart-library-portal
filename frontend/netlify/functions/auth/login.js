import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDatabase } from "../lib/mongodb.js";

export default async (request) => {
  if (request.method !== "POST") {
    return Response.json(
      {
        success: false,
        message: "Method not allowed"
      },
      {
        status: 405
      }
    );
  }

  try {
    const {
      loginId,
      password
    } = await request.json();

    if (!loginId || !password) {
      return Response.json(
        {
          success: false,
          message: "Login ID and password are required"
        },
        {
          status: 400
        }
      );
    }

    const db = await getDatabase();

    const user = await db
      .collection("users")
      .findOne({
        $or: [
          { regNo: loginId },
          { idNumber: loginId },
          { phone: loginId }
        ]
      });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Invalid login details"
        },
        {
          status: 401
        }
      );
    }

    if (!user.isVerified) {
      return Response.json(
        {
          success: false,
          message:
            "Please verify your phone number using OTP first"
        },
        {
          status: 403
        }
      );
    }

    const passwordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordCorrect) {
      return Response.json(
        {
          success: false,
          message: "Invalid login details"
        },
        {
          status: 401
        }
      );
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    return Response.json({
      success: true,

      message: "Login successful",

      token,

      user: {
        id: user._id.toString(),
        name: user.name,
        regNo: user.regNo,
        idNumber: user.idNumber,
        role: user.role,
        department: user.department,
        phone: user.phone,
        photoUrl: user.photoUrl || ""
      }
    });

  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          error.message || "Login failed"
      },
      {
        status: 500
      }
    );
  }
};