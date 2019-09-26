const express = require("express");
const mongoose = require('mongoose');
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const router = express.Router();

router.post('/signup' ,async (req, res) => {
    const user = new User(req.body)
    try {
        const token = jwt.sign({userId: user._id}, "asdasdawdasda");
        user.token = token;
        await user.save()
        res.send({token})
    }catch(e) {
        res.status(400).send(e)
    }
});
router.post('/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = jwt.sign({userId: user._id}, "asdasdawdasda");
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;