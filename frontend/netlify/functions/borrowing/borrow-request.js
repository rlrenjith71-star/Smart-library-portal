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

    if (decoded.role === "admin") {
      return Response.json(
        {
          success: false,
          message:
            "Admin cannot submit borrow requests"
        },
        {
          status: 403
        }
      );
    }

    const { resourceId } =
      await request.json();

    if (!resourceId) {
      return Response.json(
        {
          success: false,
          message:
            "Please select a resource"
        },
        {
          status: 400
        }
      );
    }

    const db = await getDB();

    const resource =
      await db
        .collection("resources")
        .findOne({
          _id: new ObjectId(resourceId)
        });

    if (!resource) {
      return Response.json(
        {
          success: false,
          message:
            "Resource not found"
        },
        {
          status: 404
        }
      );
    }

    const existingRequest =
      await db
        .collection("borrowRequests")
        .findOne({
          userId: decoded.userId,
          resourceId,
          status: "pending"
        });

    if (existingRequest) {
      return Response.json(
        {
          success: false,
          message:
            "You already have a pending request for this resource"
        },
        {
          status: 409
        }
      );
    }

    const user =
      await db
        .collection("users")
        .findOne({
          _id: new ObjectId(decoded.userId)
        });

    const borrowRequest = {
      userId: decoded.userId,

      userName:
        user?.name || "Unknown User",

      userRole:
        user?.role || decoded.role,

      resourceId,

      resourceTitle:
        resource.title || "Library Resource",

      status: "pending",

      createdAt: new Date(),

      updatedAt: new Date()
    };

    const result =
      await db
        .collection("borrowRequests")
        .insertOne(borrowRequest);

    return Response.json(
      {
        success: true,

        message:
          "Borrow request submitted successfully",

        requestId:
          result.insertedId.toString()
      },
      {
        status: 201
      }
    );

  } catch (error) {
    console.error(
      "Borrow request error:",
      error
    );

    return Response.json(
      {
        success: false,

        message:
          error.message ||
          "Unable to submit borrow request"
      },
      {
        status: 500
      }
    );
  }
};