import { MongoClient } from "mongodb";

let clientPromise;

const uri = process.env.MONGODB_URI;

export async function getDatabase() {
  if (!uri) {
      throw new Error(
            "MONGODB_URI is not configured"
                );
                  }

                    if (!clientPromise) {
                        const client = new MongoClient(uri);
                            clientPromise = client.connect();
                              }

                                const client = await clientPromise;

                                  return client.db(
                                      process.env.MONGODB_DB || "smart_library"
                                        );
                                        }