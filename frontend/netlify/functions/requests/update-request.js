import { ObjectId } from "mongodb";

import { getDB } from "../lib/mongodb.js";
import { verifyToken } from "../lib/auth.js";

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
    const authorization =
      request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized"
        },
        {
          status: 401
        }
      );
    }

    const token =
      authorization.replace("Bearer ", "");

    const decoded =
      verifyToken(token);

    if (decoded.role !== "admin") {
      return Response.json(
        {
          success: false,
          message:
            "Admin access required"
        },
        {
          status: 403
        }
      );
    }

    const {
      requestId,
      status
    } = await request.json();

    if (
      !requestId ||
      !["approved", "rejected"]
        .includes(status)
    ) {
      return Response.json(
        {
          success: false,

          message:
            "Invalid request or status"
        },
        {
          status: 400
        }
      );
    }

    const db = await getDB();

    const borrowRequest =
      await db
        .collection("borrowRequests")
        .findOne({
          _id: new ObjectId(requestId)
        });

    if (!borrowRequest) {
      return Response.json(
        {
          success: false,
          message:
            "Borrow request not found"
        },
        {
          status: 404
        }
      );
    }

    if (
      borrowRequest.status !== "pending"
    ) {
      return Response.json(
        {
          success: false,

          message:
            "This request has already been processed"
        },
        {
          status: 400
        }
      );
    }

    await db
      .collection("borrowRequests")
      .updateOne(
        {
          _id:
            new ObjectId(requestId)
        },
        {
          $set: {
            status,
            updatedAt: new Date(),
            processedBy:
              decoded.userId
          }
        }
      );

    return Response.json({
      success: true,

      message:
        status === "approved"
          ? "Borrow request approved successfully"
          : "Borrow request rejected successfully"
    });

  } catch (error) {
    console.error(
      "Update request error:",
      error
    );

    return Response.json(
      {
        success: false,

        message:
          error.message ||
          "Unable to update request"
      },
      {
        status: 500
      }
    );
  }
};