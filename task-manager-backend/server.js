const express = require('express');
const app = express();
const router = require('./routes/router');
const cors = require('cors');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/api', router);

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})