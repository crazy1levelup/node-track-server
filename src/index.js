const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('../src/middlewares/requireAuth');
const trackRoutes = require('./routes/trackRoutes');
const app = express();
app.use(bodyParser.json())
app.use(authRouter);
app.use(trackRoutes);

const mongoUri = process.env.mongoUri
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


app.get('/', requireAuth, async (req, res) => {
    res.send(`your email ${req.user.email}`)
});

app.listen(3000, () => {
    console.log("listening port 3000")
})