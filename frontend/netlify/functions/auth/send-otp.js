import crypto from "crypto";
import client from "../lib/twilio.js";
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
    const { phone } = await request.json();

    if (!phone) {
      return Response.json(
        {
          success: false,
          message: "Phone number is required"
        },
        {
          status: 400
        }
      );
    }

    const db = await getDatabase();

    const user = await db
      .collection("users")
      .findOne({ phone });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found"
        },
        {
          status: 404
        }
      );
    }

    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();

    const otpExpiry =
      new Date(Date.now() + 10 * 60 * 1000);

    await db.collection("users").updateOne(
      {
        _id: user._id
      },
      {
        $set: {
          otp,
          otpExpiry
        }
      }
    );

    await client.messages.create({
      body:
        `Your Smart Library Portal OTP is ${otp}. It expires in 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    return Response.json({
      success: true,
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error(
      "Send OTP error:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          error.message || "Unable to send OTP"
      },
      {
        status: 500
      }
    );
  }
};