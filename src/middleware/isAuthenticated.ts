import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';


interface Payload {
  sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido!' });
  }
  const [, token] = authHeader.split(' ');

  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET) as Payload;
    req.user = {
      _id: sub
    };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido!' });
  }
}