const express = require('express');
const connectDB = require('./config/database.js');
const https = require('https');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem'),
};

const app = express();

//connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'welcome to Soparan api' }));

//Define routes
app.use(require('./routes/user_post'));
app.use(require('./routes/login_post'));
app.use(require('./routes/user_get'));
app.use(require('./routes/post_post'));
app.use(require('./routes/posts_get'));
app.use(require('./routes/post_id_get'));
app.use(require('./routes/post_patch'));
app.use(require('./routes/post_delete'));


const PORT = process.env.PORT || 5000;

https.createServer(options, app).listen(PORT, () => console.log(`Listening on port ${PORT}`));