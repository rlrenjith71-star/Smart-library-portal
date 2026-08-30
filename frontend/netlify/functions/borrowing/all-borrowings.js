import { getDB } from "../../../lib/mongodb.js";
import { requireAuth } from "../../../lib/auth.js";

export default async (request) => {
  if (request.method !== "GET") {
      return Response.json(
            { success: false, message: "Method not allowed" },
                  { status: 405 }
                      );
                        }

                          try {
                              const user = requireAuth(request.headers);

                                  if (
                                        user.role !== "admin" &&
                                              user.role !== "librarian"
                                                  ) {
                                                        return Response.json(
                                                                {
                                                                          success: false,
                                                                                    message: "Unauthorized"
                                                                                            },
                                                                                                    { status: 403 }
                                                                                                          );
                                                                                                              }

                                                                                                                  const db = await getDB();

                                                                                                                      const borrowings = await db
                                                                                                                            .collection("borrowings")
                                                                                                                                  .find({})
                                                                                                                                        .sort({
                                                                                                                                                createdAt: -1
                                                                                                                                                      })
                                                                                                                                                            .toArray();

                                                                                                                                                                const now = new Date();

                                                                                                                                                                    const result = borrowings.map((borrow) => {
                                                                                                                                                                          let status = borrow.status;

                                                                                                                                                                                if (
                                                                                                                                                                                        status === "borrowed" &&
                                                                                                                                                                                                new Date(borrow.dueDate) < now
                                                                                                                                                                                                      ) {
                                                                                                                                                                                                              status = "overdue";
                                                                                                                                                                                                                    }

                                                                                                                                                                                                                          return {
                                                                                                                                                                                                                                  ...borrow,
                                                                                                                                                                                                                                          _id: borrow._id.toString(),
                                                                                                                                                                                                                                                  calculatedStatus: status
                                                                                                                                                                                                                                                        };
                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                return Response.json({
                                                                                                                                                                                                                                                                      success: true,
                                                                                                                                                                                                                                                                            count: result.length,
                                                                                                                                                                                                                                                                                  borrowings: result
                                                                                                                                                                                                                                                                                      });

                                                                                                                                                                                                                                                                                        } catch (error) {
                                                                                                                                                                                                                                                                                            console.error(error);

                                                                                                                                                                                                                                                                                                return Response.json(
                                                                                                                                                                                                                                                                                                      {
                                                                                                                                                                                                                                                                                                              success: false,
                                                                                                                                                                                                                                                                                                                      message:
                                                                                                                                                                                                                                                                                                                                error.message || "Unable to fetch borrowings"
                                                                                                                                                                                                                                                                                                                                      },
                                                                                                                                                                                                                                                                                                                                            { status: 500 }
                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                  };