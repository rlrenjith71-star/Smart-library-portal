import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET;

export async function hashPassword(
  password
) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(
  password,
  hashedPassword
) {
  return bcrypt.compare(
    password,
    hashedPassword
  );
}

export function generateToken(payload) {
  if (!JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is not configured"
    );
  }

  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
}

export function verifyToken(token) {
  if (!JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is not configured"
    );
  }

  return jwt.verify(
    token,
    JWT_SECRET
  );
}