import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
  }

  export async function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
    }

    export function createToken(user) {
      return jwt.sign(
          {
                id: user._id.toString(),
                      name: user.name,
                            role: user.role,
                                  registerNumber: user.registerNumber
                                      },
                                          JWT_SECRET,
                                              {
                                                    expiresIn: "7d"
                                                        }
                                                          );
                                                          }

                                                          export function verifyToken(token) {
                                                            return jwt.verify(token, JWT_SECRET);
                                                            }

                                                            export function getTokenFromHeaders(headers) {
                                                              const authorization =
                                                                  headers.authorization || headers.Authorization;

                                                                    if (!authorization) {
                                                                        return null;
                                                                          }

                                                                            if (!authorization.startsWith("Bearer ")) {
                                                                                return null;
                                                                                  }

                                                                                    return authorization.split(" ")[1];
                                                                                    }

                                                                                    export function requireAuth(headers) {
                                                                                      const token = getTokenFromHeaders(headers);

                                                                                        if (!token) {
                                                                                            throw new Error("Authentication required");
                                                                                              }

                                                                                                return verifyToken(token);
                                                                                                }