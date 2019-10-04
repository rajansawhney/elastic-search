const express = require('express');
const bodyParser = require('body-parser');
const { playRoutes } = require('./play/play_routers');
let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.status(200).send({
        status: true,
        response: 'Hello World!'
    });
});

app.use('/play', playRoutes);

app.listen(30006, () => {
    console.log(' ********** : running on 30006');
})

module.exports = app;