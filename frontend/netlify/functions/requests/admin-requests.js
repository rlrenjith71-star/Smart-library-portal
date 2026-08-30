import { getDB } from "../lib/mongodb.js";
import { verifyToken } from "../lib/auth.js";

export default async (request) => {
  if (request.method !== "GET") {
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

    const db = await getDB();

    const requests =
      await db
        .collection("borrowRequests")
        .find({})
        .sort({
          createdAt: -1
        })
        .toArray();

    const formattedRequests =
      requests.map((borrowRequest) => ({
        ...borrowRequest,

        _id:
          borrowRequest._id.toString()
      }));

    return Response.json({
      success: true,

      requests:
        formattedRequests
    });

  } catch (error) {
    console.error(
      "Admin requests error:",
      error
    );

    return Response.json(
      {
        success: false,

        message:
          error.message ||
          "Unable to load admin requests"
      },
      {
        status: 500
      }
    );
  }
};