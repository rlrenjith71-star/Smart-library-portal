import { getDB } from "../../../lib/mongodb.js";
import { requireAuth } from "../../../lib/auth.js";

export default async (request) => {
  if (request.method !== "POST") {
      return Response.json({ success: false, message: "Method not allowed" }, { status: 405 });
        }

          try {
              const user = requireAuth(request.headers);
                  const { signature } = await request.json();

                      if (!signature) {
                            return Response.json(
                                    { success: false, message: "E-signature is required" },
                                            { status: 400 }
                                                  );
                                                      }

                                                          const db = await getDB();

                                                              const now = new Date();

                                                                  const visit = {
                                                                        userId: user.id,
                                                                              registerNumber: user.registerNumber,
                                                                                    name: user.name,
                                                                                          date: now,
                                                                                                inTime: now,
                                                                                                      outTime: null,
                                                                                                            inSignature: signature,
                                                                                                                  outSignature: "",
                                                                                                                        createdAt: now
                                                                                                                            };

                                                                                                                                const result = await db.collection("library_visits").insertOne(visit);

                                                                                                                                    return Response.json({
                                                                                                                                          success: true,
                                                                                                                                                message: "Checked in successfully",
                                                                                                                                                      visitId: result.insertedId.toString()
                                                                                                                                                          });
                                                                                                                                                            } catch (error) {
                                                                                                                                                                return Response.json(
                                                                                                                                                                      { success: false, message: error.message },
                                                                                                                                                                            { status: 500 }
                                                                                                                                                                                );
                                                                                                                                                                                  }
                                                                                                                                                                                  };