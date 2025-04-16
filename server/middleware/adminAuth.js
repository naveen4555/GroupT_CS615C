const adminCredentials = {
  username: 'admin@123',
  password: 'Password@123'
};

const adminAuth = (req, res, next) => {
  const { username, password } = req.body;

  if (username === adminCredentials.username && password === adminCredentials.password) {
    req.isAdmin = true;
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Invalid admin credentials' });
  }
};

module.exports = adminAuth; 