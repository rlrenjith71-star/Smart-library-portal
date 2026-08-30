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

                                  const db = await getDB();

                                      const books = await db
                                            .collection("borrowings")
                                                  .find({
                                                          userId: user.id
                                                                })
                                                                      .sort({
                                                                              createdAt: -1
                                                                                    })
                                                                                          .toArray();

                                                                                              const now = new Date();

                                                                                                  const updatedBooks = books.map((book) => {
                                                                                                        let calculatedStatus = book.status;

                                                                                                              if (
                                                                                                                      book.status === "borrowed" &&
                                                                                                                              new Date(book.dueDate) < now
                                                                                                                                    ) {
                                                                                                                                            calculatedStatus = "overdue";
                                                                                                                                                  }

                                                                                                                                                        return {
                                                                                                                                                                ...book,
                                                                                                                                                                        _id: book._id.toString(),
                                                                                                                                                                                calculatedStatus
                                                                                                                                                                                      };
                                                                                                                                                                                          });

                                                                                                                                                                                              return Response.json({
                                                                                                                                                                                                    success: true,

                                                                                                                                                                                                          count: updatedBooks.length,

                                                                                                                                                                                                                books: updatedBooks
                                                                                                                                                                                                                    });

                                                                                                                                                                                                                      } catch (error) {
                                                                                                                                                                                                                          console.error(error);

                                                                                                                                                                                                                              return Response.json(
                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                            success: false,
                                                                                                                                                                                                                                                    message:
                                                                                                                                                                                                                                                              error.message || "Unable to fetch borrowed books"
                                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                                          { status: 500 }
                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                };