const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const { apiRouter } = require('./router');
const { MONGO_URL, PORT } = require('./config/config');

const app = express();
// eslint-disable-next-line no-use-before-define
_connectDB();

app.use(fileUpload());
app.use(express.static(path.join(process.cwd(), 'static')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            code: err.customCode || 0,
            message: err.message || ''
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;
    connection.on('error', (error) => {
        console.log(error);
    });
}
