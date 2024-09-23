

import jwt from "jsonwebtoken";

export default function generateAccessToken({ _id, name, email, role ,avatar}) {
  const token = jwt.sign(
    {
      _id,
      name,
      email,
      role,
      avatarId: avatar?.public_id
    },
    process.env.TOKEN_SECRET
  );

  return token;
}
