import { getDatabase } from "./lib/mongodb.js";

export default async () => {
  try {
      const db = await getDatabase();

          await db.command({ ping: 1 });

              return new Response(
                    JSON.stringify({
                            success: true,
                                    message: "MongoDB connected successfully"
                                          }),
                                                {
                                                        status: 200,
                                                                headers: {
                                                                          "Content-Type": "application/json"
                                                                                  }
                                                                                        }
                                                                                            );
                                                                                              } catch (error) {
                                                                                                  console.error(error);

                                                                                                      return new Response(
                                                                                                            JSON.stringify({
                                                                                                                    success: false,
                                                                                                                            message: error.message
                                                                                                                                  }),
                                                                                                                                        {
                                                                                                                                                status: 500,
                                                                                                                                                        headers: {
                                                                                                                                                                  "Content-Type": "application/json"
                                                                                                                                                                          }
                                                                                                                                                                                }
                                                                                                                                                                                    );
                                                                                                                                                                                      }
                                                                                                                                                                                      };