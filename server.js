const express=require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute=require("./router/auth");
const jobRoute=require("./router/job");

dotenv.config();

// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json());

mongoose
.connect(process.env.MONGODB_URL)
.then(()=>console.log("connected to the database"))
.catch(err=>console.log(err))

app.get('/', (req,res)=>{
    res.send("welcome bijay")
})


app.use('/api/v1/auth',authRoute)
app.use('/api/v1/job',jobRoute)

const port=7000

app.listen(port,()=>{
    console.log(`connected to the port ${port}`);
})