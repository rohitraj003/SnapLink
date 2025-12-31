const express = require('express');
const router = express.Router();
const base62 = require('base62'); 
const Url = require('../models/Url');
const redisClient = require('../config/redis');
const auth = require('../middleware/auth'); 
const rateLimiter = require('../middleware/rateLimiter');


router.post('/shorten', auth, rateLimiter, async (req, res) => {
    const { longUrl } = req.body;

    try {
        
        const id = await redisClient.incr('global_url_counter');

       
        const shortCode = base62.encode(id); 

        const newUrl = new Url({
            _id: id,
            longUrl,
            shortCode,
            userId: req.user.id
        });
        await newUrl.save();

        
        await redisClient.set(shortCode, longUrl);

        res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/:code', async (req, res) => {
    const { code } = req.params;

    try {
       
        const cachedUrl = await redisClient.get(code);
        
        if (cachedUrl) {
            return res.redirect(cachedUrl);
        }

        
        const urlDoc = await Url.findOne({ shortCode: code });

        if (urlDoc) {
            
            await redisClient.set(code, urlDoc.longUrl);
            return res.redirect(urlDoc.longUrl);
        } else {
            return res.status(404).json({ error: 'URL not found' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;