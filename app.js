const express = require('express');
const mongoose  = require('mongoose');
const config = require('config');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const server = config.get('server');

mongoose.connect(server.mongoServer, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify : false
})
.then(() => console.log(`Server iniciado ${server.mongoServer}`))
.catch(err => console.log(err.reason));


app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Routes
const authRoutes = require('./router/auth');
const agendaRoutes = require('./router/agenda');

app.listen(server.port, () => {
    console.log(`*************************************************************************`)
    console.log(`*****                          PORT                                ******`)
    console.log(`*****                          ${server.port}                                ******`)
    console.log(`*************************************************************************`)
    console.log(`*************************************************************************`)
});

app.use(`${server.apiRoot}/auth`, authRoutes);
app.use(`${server.apiRoot}/agenda`, agendaRoutes);