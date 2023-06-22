const allowedCorsOrigins = [
  // 'https://vecoweb22.nomoredomains.rocks',
  // 'http://vecoweb22.nomoredomains.rocks',
  // 'localhost:3000',
  // 'http://localhost',
  'http://localhost:3001',
  'http://localhost:3000',
];

const corsWare = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const allowedMethod = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethod);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    if (allowedCorsOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }

    return res.end();
  }

  return next();
};

module.exports = {
  allowedCorsOrigins,
  corsWare,
};
