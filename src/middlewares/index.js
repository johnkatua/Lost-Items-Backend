const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  };

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = decoded._id;
    next();
  }  catch (err) {
    res.status(400).send('Invalid token.');
  }
};

const checkIsAdmin = async (req, res, next) => {
  if (req.body.userRole === 0) {
    return res.status(403).json({
      status: 403,
      message: 'Forbidden',
    });
  }
  return next();
};

module.exports = {
  checkIsAdmin,
  verifyToken
};