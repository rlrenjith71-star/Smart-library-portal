import { getDB } from "../../../lib/mongodb.js";
import { requireAuth } from "../../../lib/auth.js";

export default async (request) => {
  try {
      const user = requireAuth(request.headers);
          const db = await getDB();

              const visits = await db.collection("library_visits")
                    .find({ userId: user.id })
                          .sort({ inTime: -1 })
                                .toArray();

                                    return Response.json({
                                          success: true,
                                                visits: visits.map((visit) => ({
                                                        ...visit,
                                                                _id: visit._id.toString()
                                                                      }))
                                                                          });
                                                                            } catch (error) {
                                                                                return Response.json(
                                                                                      { success: false, message: error.message },
                                                                                            { status: 500 }
                                                                                                );
                                                                                                  }
                                                                                                  };