import { getDB } from "../../../lib/mongodb.js";

export default async (request) => {
  if (request.method !== "GET") {
      return Response.json(
            { success: false, message: "Method not allowed" },
                  { status: 405 }
                      );
                        }

                          try {
                              const url = new URL(request.url);

                                  const search = url.searchParams.get("search") || "";
                                      const department = url.searchParams.get("department") || "";
                                          const genre = url.searchParams.get("genre") || "";

                                              const query = {};

                                                  if (department) {
                                                        query.department = department;
                                                            }

                                                                if (genre) {
                                                                      query.genre = genre;
                                                                          }

                                                                              if (search) {
                                                                                    query.$or = [
                                                                                            {
                                                                                                      title: {
                                                                                                                  $regex: search,
                                                                                                                              $options: "i"
                                                                                                                                        }
                                                                                                                                                },
                                                                                                                                                        {
                                                                                                                                                                  author: {
                                                                                                                                                                              $regex: search,
                                                                                                                                                                                          $options: "i"
                                                                                                                                                                                                    }
                                                                                                                                                                                                            },
                                                                                                                                                                                                                    {
                                                                                                                                                                                                                              isbn: {
                                                                                                                                                                                                                                          $regex: search,
                                                                                                                                                                                                                                                      $options: "i"
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                              ];
                                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                                      const db = await getDB();

                                                                                                                                                                                                                                                                                          const books = await db
                                                                                                                                                                                                                                                                                                .collection("books")
                                                                                                                                                                                                                                                                                                      .find(query)
                                                                                                                                                                                                                                                                                                            .sort({ createdAt: -1 })
                                                                                                                                                                                                                                                                                                                  .toArray();

                                                                                                                                                                                                                                                                                                                      return Response.json({
                                                                                                                                                                                                                                                                                                                            success: true,
                                                                                                                                                                                                                                                                                                                                  count: books.length,
                                                                                                                                                                                                                                                                                                                                        books: books.map((book) => ({
                                                                                                                                                                                                                                                                                                                                                ...book,
                                                                                                                                                                                                                                                                                                                                                        _id: book._id.toString()
                                                                                                                                                                                                                                                                                                                                                              }))
                                                                                                                                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                                                                                                                                    } catch (error) {
                                                                                                                                                                                                                                                                                                                                                                        console.error(error);

                                                                                                                                                                                                                                                                                                                                                                            return Response.json(
                                                                                                                                                                                                                                                                                                                                                                                  {
                                                                                                                                                                                                                                                                                                                                                                                          success: false,
                                                                                                                                                                                                                                                                                                                                                                                                  message: error.message || "Unable to fetch books"
                                                                                                                                                                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                                                                                                                                                                              { status: 500 }
                                                                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                    };