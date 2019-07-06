const express = require('express');
const bodyParaser = require('body-parser');
const path = require('path');

const api = require('./server/routes/api');

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname,'dist/ngApp')));
app.use(bodyParaser.urlencoded({extended:true}));
app.use(bodyParaser.json());
app.use('/api',api);

app.get('*',(req, res) =>{
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, ()=>{
    console.log("Server running at localhost : "+port);
});
