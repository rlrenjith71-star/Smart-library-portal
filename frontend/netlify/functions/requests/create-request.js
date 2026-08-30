import { getDB } from "../../../lib/mongodb.js";
import { requireAuth } from "../../../lib/auth.js";

export default async (request) => {
  if (request.method !== "POST") {
      return Response.json({ success: false, message: "Method not allowed" }, { status: 405 });
        }

          try {
              const user = requireAuth(request.headers);
                  const { bookName, author, department, reason, priority } = await request.json();

                      if (!bookName || !department) {
                            return Response.json(
                                    { success: false, message: "Book name and department are required" },
                                            { status: 400 }
                                                  );
                                                      }

                                                          const db = await getDB();

                                                              const bookRequest = {
                                                                    userId: user.id,
                                                                          userName: user.name,
                                                                                registerNumber: user.registerNumber,
                                                                                      bookName,
                                                                                            author: author || "",
                                                                                                  department,
                                                                                                        reason: reason || "",
                                                                                                              priority: priority || "normal",
                                                                                                                    status: "pending",
                                                                                                                          adminRemark: "",
                                                                                                                                createdAt: new Date(),
                                                                                                                                      updatedAt: new Date()
                                                                                                                                          };

                                                                                                                                              const result = await db.collection("book_requests").insertOne(bookRequest);

                                                                                                                                                  return Response.json({
                                                                                                                                                        success: true,
                                                                                                                                                              message: "Book request submitted successfully",
                                                                                                                                                                    requestId: result.insertedId.toString()
                                                                                                                                                                        });
                                                                                                                                                                          } catch (error) {
                                                                                                                                                                              return Response.json(
                                                                                                                                                                                    { success: false, message: error.message || "Unable to submit request" },
                                                                                                                                                                                          { status: 500 }
                                                                                                                                                                                              );
                                                                                                                                                                                                }
                                                                                                                                                                                                };