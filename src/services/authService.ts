import jwt from 'jsonwebtoken';
import { UserToken } from '../models/user.model';

const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';

export const generateToken = (user: UserToken) => {
    return jwt.sign({ user}, secretKey, { expiresIn: '1h'})
}
