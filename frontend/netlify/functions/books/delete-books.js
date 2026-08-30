import { ObjectId } from "mongodb";

import { getDB } from "../../../lib/mongodb.js";
import { requireAuth } from "../../../lib/auth.js";

export default async (request) => {
  if (request.method !== "DELETE") {
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

                                                                                                                  const url = new URL(request.url);

                                                                                                                      const bookId =
                                                                                                                            url.searchParams.get("bookId");

                                                                                                                                if (!bookId) {
                                                                                                                                      return Response.json(
                                                                                                                                              {
                                                                                                                                                        success: false,
                                                                                                                                                                  message: "Book ID is required"
                                                                                                                                                                          },
                                                                                                                                                                                  { status: 400 }
                                                                                                                                                                                        );
                                                                                                                                                                                            }

                                                                                                                                                                                                const db = await getDB();

                                                                                                                                                                                                    const result = await db
                                                                                                                                                                                                          .collection("books")
                                                                                                                                                                                                                .deleteOne({
                                                                                                                                                                                                                        _id: new ObjectId(bookId)
                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                  if (result.deletedCount === 0) {
                                                                                                                                                                                                                                        return Response.json(
                                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                                          success: false,
                                                                                                                                                                                                                                                                    message: "Book not found"
                                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                                                    { status: 404 }
                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                                                  return Response.json({
                                                                                                                                                                                                                                                                                                        success: true,
                                                                                                                                                                                                                                                                                                              message: "Book deleted successfully"
                                                                                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                                                                                    } catch (error) {
                                                                                                                                                                                                                                                                                                                        console.error(error);

                                                                                                                                                                                                                                                                                                                            return Response.json(
                                                                                                                                                                                                                                                                                                                                  {
                                                                                                                                                                                                                                                                                                                                          success: false,
                                                                                                                                                                                                                                                                                                                                                  message: error.message || "Unable to delete book"
                                                                                                                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                                                                                                                              { status: 500 }
                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                    };