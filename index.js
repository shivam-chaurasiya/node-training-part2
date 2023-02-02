require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/userroutes');
const connectDB = require('./config/db')
const bodyparser = require('body-parser');

const router1 = require('./routes/usersignuproute');

connectDB();


app.use(express.json({ extended: false }));
//app.get("/", (req, res) => res.send("Server up and running"));


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use('/user' , router);

app.use('/userlo', router1);


 // error handling
app.use((req, res, next) => {
    res.status(404).json({
        error:'bad request'
    })
})
  
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});