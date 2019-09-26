const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "asdasdawdasda");
        const user = await User.findById(decoded.userId);
        console.log(decoded)

        if (!user) {
            throw new Error()
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: "please authenticate" })
    }
}

module.exports = auth;