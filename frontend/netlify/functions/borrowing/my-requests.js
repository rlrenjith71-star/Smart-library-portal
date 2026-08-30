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

    const db = await getDB();

    const requests =
      await db
        .collection("borrowRequests")
        .find({
          userId: decoded.userId
        })
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
      "My requests error:",
      error
    );

    return Response.json(
      {
        success: false,

        message:
          error.message ||
          "Unable to load requests"
      },
      {
        status: 500
      }
    );
  }
};