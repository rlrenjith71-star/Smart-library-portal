import { getDB } from "../../../lib/mongodb.js";

export default async (request) => {
  try {
      const url = new URL(request.url);
          const department = url.searchParams.get("department");
              const type = url.searchParams.get("type");

                  const query = {};

                      if (department) query.department = department;
                          if (type) query.type = type;

                              const db = await getDB();

                                  const resources = await db.collection("resources")
                                        .find(query)
                                              .sort({ createdAt: -1 })
                                                    .toArray();

                                                        return Response.json({
                                                              success: true,
                                                                    resources: resources.map((resource) => ({
                                                                            ...resource,
                                                                                    _id: resource._id.toString()
                                                                                          }))
                                                                                              });
                                                                                                } catch (error) {
                                                                                                    return Response.json(
                                                                                                          { success: false, message: error.message },
                                                                                                                { status: 500 }
                                                                                                                    );
                                                                                                                      }
                                                                                                                      };