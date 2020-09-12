import config from '../../config.json';
import jwt from 'jsonwebtoken';

export default async function verifyToken(authHeader) {
  if (!authHeader) return null;

  // Verify that the string is 'Bearer <token>'
  const parts = authHeader.split(' ');
  if (parts.length === 2) {
    const scheme = parts[0];
    const token = parts[1];

    if (/^Bearer$/.test(scheme)) {
      // Verify if the token is valid and extracts the userId
      const { userId } = jwt.verify(token, config.secret, (err, decoded) => {
        if (err) return { userId: null };
        return decoded;
      });

      return userId;
    }
  }
  throw new Error('Invalid Authorization Structure');
}
