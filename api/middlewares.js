const jwt = require('jsonwebtoken');

function createVerifyTokenMiddleware(client) {
  if (!client) throw new Error('Musisz podać klienta!');

  // Funkcja do pobrania klucza
  function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key) {
      if (err) return callback(err);
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }

  // Middleware do weryfikacji tokenu
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Brak tokena Bearer' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, getKey, {
      audience: 'node-api',
      issuer: 'https://dev-tah3h7wxplpcrg31.eu.auth0.com/',
      algorithms: ['RS256']
    }, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Niepoprawny token', details: err.message });
      }

      req.user = decoded;
      next();
    });
  };
}


const verifyPermission = (requiredPermissions = []) => (req, res, next) => {
  const userPermissions = req.user?.permissions || [];
  const hasPermission = requiredPermissions.every(p => userPermissions.includes(p));

  if (!hasPermission) {
    return res.status(403).json({ error: 'Brak odpowiednich uprawnień' });
  }
  next();
};


module.exports = {
    createVerifyTokenMiddleware,
    verifyPermission
}