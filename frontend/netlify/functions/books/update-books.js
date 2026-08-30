import { ObjectId } from "mongodb";

import { getDB } from "../../../lib/mongodb.js";
import { requireAuth } from "../../../lib/auth.js";

export default async (request) => {
  if (request.method !== "PUT") {
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

                                                                                                                  const data = await request.json();

                                                                                                                      const { bookId, ...updates } = data;

                                                                                                                          if (!bookId) {
                                                                                                                                return Response.json(
                                                                                                                                        {
                                                                                                                                                  success: false,
                                                                                                                                                            message: "Book ID is required"
                                                                                                                                                                    },
                                                                                                                                                                            { status: 400 }
                                                                                                                                                                                  );
                                                                                                                                                                                      }

                                                                                                                                                                                          delete updates._id;
                                                                                                                                                                                              delete updates.createdAt;

                                                                                                                                                                                                  updates.updatedAt = new Date();

                                                                                                                                                                                                      if (updates.totalCopies !== undefined) {
                                                                                                                                                                                                            updates.totalCopies =
                                                                                                                                                                                                                    Number(updates.totalCopies);
                                                                                                                                                                                                                        }

                                                                                                                                                                                                                            const db = await getDB();

                                                                                                                                                                                                                                const result = await db
                                                                                                                                                                                                                                      .collection("books")
                                                                                                                                                                                                                                            .updateOne(
                                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                                              _id: new ObjectId(bookId)
                                                                                                                                                                                                                                                                      },
                                                                                                                                                                                                                                                                              {
                                                                                                                                                                                                                                                                                        $set: updates
                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                      );

                                                                                                                                                                                                                                                                                                          if (result.matchedCount === 0) {
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
                                                                                                                                                                                                                                                                                                                                                                                      message: "Book updated successfully"
                                                                                                                                                                                                                                                                                                                                                                                          });

                                                                                                                                                                                                                                                                                                                                                                                            } catch (error) {
                                                                                                                                                                                                                                                                                                                                                                                                console.error(error);

                                                                                                                                                                                                                                                                                                                                                                                                    return Response.json(
                                                                                                                                                                                                                                                                                                                                                                                                          {
                                                                                                                                                                                                                                                                                                                                                                                                                  success: false,
                                                                                                                                                                                                                                                                                                                                                                                                                          message: error.message || "Unable to update book"
                                                                                                                                                                                                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                                                                                                                                                                                                                      { status: 500 }
                                                                                                                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                            };