import bcrypt from "bcryptjs";
import crypto from "crypto";
import { getDatabase } from "../lib/mongodb.js";
import client from "../lib/twilio.js";

export default async (request) => {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({
        message: "Method not allowed"
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  try {
    const body = await request.json();

    const {
      name,
      regNo,
      idNumber,
      phone,
      password,
      department
    } = body;

    if (
      !name ||
      !regNo ||
      !idNumber ||
      !phone ||
      !password
    ) {
      return new Response(
        JSON.stringify({
          message: "Please fill all required fields"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    const db = await getDatabase();

    const existingUser =
      await db.collection("users").findOne({
        $or: [
          { regNo },
          { idNumber },
          { phone }
        ]
      });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          message:
            "User already registered with these details"
        }),
        {
          status: 409,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();

    const otpExpiry =
      new Date(Date.now() + 10 * 60 * 1000);

    const result =
      await db.collection("users").insertOne({
        name,
        regNo,
        idNumber,
        phone,
        department: department || "",
        password: hashedPassword,
        otp,
        otpExpiry,
        isVerified: false,
        role: "student",
        createdAt: new Date()
      });

    try {
      await client.messages.create({
        body:
          `Your Smart Library Portal OTP is ${otp}. It expires in 10 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
      });
    } catch (smsError) {
      console.error(
        "SMS sending error:",
        smsError
      );

      return new Response(
        JSON.stringify({
          message:
            "Registration created, but OTP SMS could not be sent"
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Registration successful. OTP sent to your phone.",
        userId: result.insertedId.toString()
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error) {
    console.error(
      "Registration error:",
      error
    );

    return new Response(
      JSON.stringify({
        message: "Registration failed"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};