import { getDB } from "../../../lib/mongodb.js";
import { requireAuth } from "../../../lib/auth.js";

export default async (request) => {
  if (request.method !== "POST") {
      return Response.json({ success: false, message: "Method not allowed" }, { status: 405 });
        }

          try {
              const user = requireAuth(request.headers);

                  if (!["admin", "librarian"].includes(user.role)) {
                        return Response.json(
                                { success: false, message: "Unauthorized" },
                                        { status: 403 }
                                              );
                                                  }

                                                      const data = await request.json();

                                                          const {
                                                                title,
                                                                      type,
                                                                            department,
                                                                                  semester,
                                                                                        year,
                                                                                              author,
                                                                                                    guide,
                                                                                                          description,
                                                                                                                fileUrl
                                                                                                                    } = data;

                                                                                                                        if (!title || !type || !department) {
                                                                                                                              return Response.json(
                                                                                                                                      { success: false, message: "Title, type and department are required" },
                                                                                                                                              { status: 400 }
                                                                                                                                                    );
                                                                                                                                                        }

                                                                                                                                                            const db = await getDB();

                                                                                                                                                                const resource = {
                                                                                                                                                                      title,
                                                                                                                                                                            type,
                                                                                                                                                                                  department,
                                                                                                                                                                                        semester: semester || "",
                                                                                                                                                                                              year: year || "",
                                                                                                                                                                                                    author: author || "",
                                                                                                                                                                                                          guide: guide || "",
                                                                                                                                                                                                                description: description || "",
                                                                                                                                                                                                                      fileUrl: fileUrl || "",
                                                                                                                                                                                                                            uploadedBy: user.id,
                                                                                                                                                                                                                                  createdAt: new Date()
                                                                                                                                                                                                                                      };

                                                                                                                                                                                                                                          const result = await db.collection("resources").insertOne(resource);

                                                                                                                                                                                                                                              return Response.json({
                                                                                                                                                                                                                                                    success: true,
                                                                                                                                                                                                                                                          message: "Resource added successfully",
                                                                                                                                                                                                                                                                resourceId: result.insertedId.toString()
                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                      } catch (error) {
                                                                                                                                                                                                                                                                          return Response.json(
                                                                                                                                                                                                                                                                                { success: false, message: error.message },
                                                                                                                                                                                                                                                                                      { status: 500 }
                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                            };