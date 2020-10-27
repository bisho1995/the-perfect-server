const csp = {
  directives: {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      // "'unsafe-inline'",
      // 	"'unsafe-eval'",
      (req) => (req.nonce ? `'nonce-${req.nonce}'` : ""),
    ],
    "style-src": [
      "'self'",
      // "'unsafe-inline'",
      (req) => (req.nonce ? `'nonce-${req.nonce}'` : ""),
    ],
    "img-src": ["'self'"],
    "font-src": ["'self'"],
    "frame-src": ["'self'"],
    "child-src": ["'self'"],
    "worker-src": ["'self'"],
  },
};

module.exports = { csp };
