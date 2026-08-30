import { getDB } from "../../../lib/mongodb.js";
import { comparePassword, generateToken } from "../../../lib/auth.js";

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
    const data = await request.json();

    const {
      registerNumber,
      password
    } = data;

    if (!registerNumber || !password) {
      return Response.json(
        {
          success: false,
          message:
            "Register Number and password are required"
        },
        {
          status: 400
        }
      );
    }

    const db = await getDB();

    const user =
      await db.collection("users").findOne({
        registerNumber
      });

    if (!user) {
      return Response.json(
        {
          success: false,
          message:
            "Invalid Register Number or password"
        },
        {
          status: 401
        }
      );
    }

    const passwordMatched =
      await comparePassword(
        password,
        user.password
      );

    if (!passwordMatched) {
      return Response.json(
        {
          success: false,
          message:
            "Invalid Register Number or password"
        },
        {
          status: 401
        }
      );
    }

    const token = generateToken({
      userId: user._id.toString(),
      role: user.role
    });

    return Response.json({
      success: true,
      message: "Login successful",

      token,

      user: {
        id: user._id.toString(),
        name: user.name,
        registerNumber: user.registerNumber,
        idNumber: user.idNumber,
        phone: user.phone,
        role: user.role,
        department: user.department,
        photoUrl: user.photoUrl || ""
      }
    });

  } catch (error) {
    console.error(error);

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