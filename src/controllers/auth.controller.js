import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  const { email, password } = req.body;

  // Validación de credenciales simulada para la entrega
  if (email === 'admin@techlab.com' && password === 'admin123') {
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ token: `Bearer ${token}` });
  }

  return res.status(401).json({ message: 'Credenciales inválidas' });
};