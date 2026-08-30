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
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return Response.json(
        {
          success: false,
          message: "Phone number and OTP are required"
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

    if (!user.otp || !user.otpExpiry) {
      return Response.json(
        {
          success: false,
          message: "OTP not found. Please request a new OTP."
        },
        {
          status: 400
        }
      );
    }

    if (new Date() > new Date(user.otpExpiry)) {
      return Response.json(
        {
          success: false,
          message: "OTP has expired"
        },
        {
          status: 400
        }
      );
    }

    if (String(user.otp) !== String(otp)) {
      return Response.json(
        {
          success: false,
          message: "Invalid OTP"
        },
        {
          status: 400
        }
      );
    }

    await db.collection("users").updateOne(
      {
        _id: user._id
      },
      {
        $set: {
          isVerified: true,
          verifiedAt: new Date()
        },
        $unset: {
          otp: "",
          otpExpiry: ""
        }
      }
    );

    return Response.json({
      success: true,
      verified: true,
      message: "Phone number verified successfully"
    });

  } catch (error) {
    console.error(
      "Verify OTP error:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          error.message || "OTP verification failed"
      },
      {
        status: 500
      }
    );
  }
};