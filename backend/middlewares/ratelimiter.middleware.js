const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: Number(process.env.RateLimiter_WindowMS),
    limit: Number(process.env.Ratelimit),
    standardHeaders: process.env.RateLimiter_standardHeaders === 'true',
    legacyHeaders: process.env.RateLimiter_legacyHeaders === 'true',
    message: {
        status: false,
        message: "Too many attempts. Please try again after few hours."
    },
});

module.exports = { limiter };
