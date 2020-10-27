const csp = {
  directives: {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      (req) => (req.nonce ? `'nonce-${req.nonce}'` : ""),
    ],
    "style-src": ["'self'", (req) => (req.nonce ? `'nonce-${req.nonce}'` : "")],
    "img-src": ["'self'"],
    "font-src": ["'self'"],
    "frame-src": ["'self'"],
    "child-src": ["'self'"],
    "worker-src": ["'self'"],
  },
};

module.exports = { csp };
