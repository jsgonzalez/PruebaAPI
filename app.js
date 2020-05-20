const express = require('express');
const mongoose  = require('mongoose');
const config = require('config');

const app = express();

const server = config.get('server');

mongoose.connect(server.mongoServer, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`Server iniciado ${server.mongoServer}`))
.catch(err => console.log(err.reason));

app.listen(server.port, () => {
    console.log(`*************************************************************************`)
    console.log(`*****                          PORT                                ******`)
    console.log(`*****                          ${server.port}                                ******`)
    console.log(`*************************************************************************`)
    console.log(`*************************************************************************`)
});