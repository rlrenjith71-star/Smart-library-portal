import { getDB } from "../../../lib/mongodb.js";
import { hashPassword } from "../../../lib/auth.js";

export default async (request) => {
  if (request.method !== "POST") {
    return Response.json(
      {
        success: false,
        message: "Method not allowed"
      },
      { status: 405 }
    );
  }

  try {
    const data = await request.json();

    const {
      name,
      registerNo,
      idNumber,
      phone,
      password,
      role,
      department,
      photoUrl,
      bonafideUrl
    } = data;

    if (
      !name ||
      !registerNo ||
      !idNumber ||
      !phone ||
      !password ||
      !department
    ) {
      return Response.json(
        {
          success: false,
          message: "Please fill all required fields"
        },
        { status: 400 }
      );
    }

    const db = await getDB();

    const existingUser =
      await db.collection("users").findOne({
        $or: [
          { registerNumber },
          { idNumber },
          { phone }
        ]
      });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message:
            "A user already exists with this Register Number, ID or phone number"
        },
        { status: 409 }
      );
    }

    const hashedPassword =
      await hashPassword(password);

    const user = {
      name,
      registerNo,
      idNumber,
      phone,
      password: hashedPassword,

      role: role || "student",

      department,

      photoUrl: photoUrl || "",

      bonafideUrl: bonafideUrl || "",

      isPhoneVerified: true,

      createdAt: new Date()
    };

    const result = await db
      .collection("users")
      .insertOne(user);

    return Response.json({
      success: true,
      message: "Registration completed successfully",
      userId: result.insertedId.toString()
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message:
          error.message || "Registration failed"
      },
      { status: 500 }
    );
  }
};