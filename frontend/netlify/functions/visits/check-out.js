import { ObjectId } from "mongodb";
import { getDB } from "../../../lib/mongodb.js";
import { requireAuth } from "../../../lib/auth.js";

export default async (request) => {
  if (request.method !== "POST") {
      return Response.json({ success: false, message: "Method not allowed" }, { status: 405 });
        }

          try {
              const user = requireAuth(request.headers);
                  const { visitId, signature } = await request.json();

                      if (!visitId || !signature) {
                            return Response.json(
                                    { success: false, message: "Visit ID and E-signature are required" },
                                            { status: 400 }
                                                  );
                                                      }

                                                          const db = await getDB();

                                                              const result = await db.collection("library_visits").updateOne(
                                                                    {
                                                                            _id: new ObjectId(visitId),
                                                                                    userId: user.id,
                                                                                            outTime: null
                                                                                                  },
                                                                                                        {
                                                                                                                $set: {
                                                                                                                          outTime: new Date(),
                                                                                                                                    outSignature: signature
                                                                                                                                            }
                                                                                                                                                  }
                                                                                                                                                      );

                                                                                                                                                          if (result.modifiedCount === 0) {
                                                                                                                                                                return Response.json(
                                                                                                                                                                        { success: false, message: "Active visit not found" },
                                                                                                                                                                                { status: 404 }
                                                                                                                                                                                      );
                                                                                                                                                                                          }

                                                                                                                                                                                              return Response.json({
                                                                                                                                                                                                    success: true,
                                                                                                                                                                                                          message: "Checked out successfully"
                                                                                                                                                                                                              });
                                                                                                                                                                                                                } catch (error) {
                                                                                                                                                                                                                    return Response.json(
                                                                                                                                                                                                                          { success: false, message: error.message },
                                                                                                                                                                                                                                { status: 500 }
                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                      };