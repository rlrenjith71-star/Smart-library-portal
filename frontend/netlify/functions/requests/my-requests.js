import { getDB } from "../../../lib/mongodb.js";
import { requireAuth } from "../../../lib/auth.js";

export default async (request) => {
  try {
      const user = requireAuth(request.headers);
          const db = await getDB();

              const requests = await db.collection("book_requests")
                    .find({ userId: user.id })
                          .sort({ createdAt: -1 })
                                .toArray();

                                    return Response.json({
                                          success: true,
                                                requests: requests.map((item) => ({
                                                        ...item,
                                                                _id: item._id.toString()
                                                                      }))
                                                                          });
                                                                            } catch (error) {
                                                                                return Response.json(
                                                                                      { success: false, message: error.message || "Unable to fetch requests" },
                                                                                            { status: 500 }
                                                                                                );
                                                                                                  }
                                                                                                  };