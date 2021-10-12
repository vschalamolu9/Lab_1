const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const dotenv = require('dotenv');

const app = express();

let corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.json({message: "Welcome to UberEats application."})
});


db.sequelize.sync({force: false}).then(()=>{
    console.log("Drop and re-sync db.");
});

require('./routes/restaurant.routes')(app);
require('./routes/item.routes')(app);
require('./routes/user.routes')(app);
require('./routes/order.routes')(app)


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);

})
