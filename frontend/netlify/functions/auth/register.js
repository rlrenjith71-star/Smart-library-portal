import { getDB } from "../lib/mongodb.js";
import { hashPassword } from "../lib/auth.js";

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
      name,
      registerNumber,
      idNumber,
      phone,
      department,
      role,
      password
    } = await request.json();

    if (
      !name ||
      !registerNumber ||
      !idNumber ||
      !phone ||
      !department ||
      !password
    ) {
      return Response.json(
        {
          success: false,
          message: "Please fill all required fields"
        },
        {
          status: 400
        }
      );
    }

    if (
      role !== "student" &&
      role !== "teacher"
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Only students and teachers can register"
        },
        {
          status: 400
        }
      );
    }

    const db = await getDB();

    const existingUser =
      await db
        .collection("users")
        .findOne({
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
            "A user already exists with this Register Number, ID Number or phone number"
        },
        {
          status: 409
        }
      );
    }

    const hashedPassword =
      await hashPassword(password);

    const user = {
      name,
      registerNumber,
      idNumber,
      phone,
      department,
      role,
      password: hashedPassword,
      createdAt: new Date()
    };

    const result =
      await db
        .collection("users")
        .insertOne(user);

    return Response.json(
      {
        success: true,
        message:
          "Registration completed successfully",
        userId:
          result.insertedId.toString()
      },
      {
        status: 201
      }
    );

  } catch (error) {
    console.error("Registration error:", error);

    return Response.json(
      {
        success: false,
        message:
          error.message ||
          "Registration failed"
      },
      {
        status: 500
      }
    );
  }
};