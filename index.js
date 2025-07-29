const express= require('express');

const app = express();

app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

require('dotenv').config();

const PORT=process.env.PORT || 3000;



const user = require('./routes/authroute');
app.use('/api/v1', user);


require('./config/database').connectToDatabase();

app.listen(PORT, () => {
    console.log('Server is running on port 4000');
}
)
app.get('/', (req, res) => {
    res.send('Hello World!');
    });
