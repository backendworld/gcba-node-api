import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Formato de token no válido' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    //console.log(error.name);
    //console.log(error.message);
    res.status(403).json({ message: 'Token inválido o expirado' });
  }
};