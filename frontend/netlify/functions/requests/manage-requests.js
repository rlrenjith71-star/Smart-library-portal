import { ObjectId } from "mongodb";
import { getDB } from "../../../lib/mongodb.js";
import { requireAuth } from "../../../lib/auth.js";

export default async (request) => {
  if (request.method !== "PUT") {
      return Response.json({ success: false, message: "Method not allowed" }, { status: 405 });
        }

          try {
              const user = requireAuth(request.headers);

                  if (!["admin", "librarian"].includes(user.role)) {
                        return Response.json(
                                { success: false, message: "Unauthorized" },
                                        { status: 403 }
                                              );
                                                  }

                                                      const { requestId, status, adminRemark } = await request.json();

                                                          const allowedStatuses = ["pending", "approved", "rejected", "purchased"];

                                                              if (!allowedStatuses.includes(status)) {
                                                                    return Response.json(
                                                                            { success: false, message: "Invalid status" },
                                                                                    { status: 400 }
                                                                                          );
                                                                                              }

                                                                                                  const db = await getDB();

                                                                                                      await db.collection("book_requests").updateOne(
                                                                                                            { _id: new ObjectId(requestId) },
                                                                                                                  {
                                                                                                                          $set: {
                                                                                                                                    status,
                                                                                                                                              adminRemark: adminRemark || "",
                                                                                                                                                        updatedAt: new Date()
                                                                                                                                                                }
                                                                                                                                                                      }
                                                                                                                                                                          );

                                                                                                                                                                              return Response.json({
                                                                                                                                                                                    success: true,
                                                                                                                                                                                          message: "Request updated successfully"
                                                                                                                                                                                              });
                                                                                                                                                                                                } catch (error) {
                                                                                                                                                                                                    return Response.json(
                                                                                                                                                                                                          { success: false, message: error.message || "Unable to update request" },
                                                                                                                                                                                                                { status: 500 }
                                                                                                                                                                                                                    );
                                                                                                                                                                                                                      }
                                                                                                                                                                                                                      };