import { ObjectId } from "mongodb";
import { getDB } from "../../../lib/mongodb.js";
import { requireAuth } from "../../../lib/auth.js";

export default async (request) => {
  if (request.method !== "DELETE") {
      return Response.json({ success: false, message: "Method not allowed" }, { status: 405 });
        }

          try {
              const user = requireAuth(request.headers);

                  if (!["admin", "librarian"].includes(user.role)) {
                        return Response.json({ success: false, message: "Unauthorized" }, { status: 403 });
                            }

                                const url = new URL(request.url);
                                    const resourceId = url.searchParams.get("resourceId");

                                        const db = await getDB();

                                            await db.collection("resources").deleteOne({
                                                  _id: new ObjectId(resourceId)
                                                      });

                                                          return Response.json({
                                                                success: true,
                                                                      message: "Resource deleted successfully"
                                                                          });
                                                                            } catch (error) {
                                                                                return Response.json(
                                                                                      { success: false, message: error.message },
                                                                                            { status: 500 }
                                                                                                );
                                                                                                  }
                                                                                                  };