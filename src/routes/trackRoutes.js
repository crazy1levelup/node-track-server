const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const Track = require('../models/Track');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
    const tracks = await Track.find({userId: req.user._id});
    res.send(tracks);
});

router.post('/tracks', async (req, res) => {
    const {name, locations} = req.body;
    if(!name || !locations) {
        return res.status(422).send({error: "provide name location"})
    }
    try {
        const track = new Track({name, locations, userId:req.user._id});
    await track.save();
    res.send(track);
    }catch(e) {
        res.send(e)
    }
    
})

module.exports = router;