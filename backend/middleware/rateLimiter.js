const redisClient = require('../config/redis');

const rateLimiter = async (req, res, next) => {
    const userId = req.user.id; 
    const key = `rate_limit:${userId}`;
    
    const requests = await redisClient.incr(key);
    
    if (requests === 1) {
        await redisClient.expire(key, 60);
    }

    if (requests > 10) {
        return res.status(429).json({ error: "Too many requests. Limit is 10 per minute." });
    }
    
    next();
};

module.exports = rateLimiter;