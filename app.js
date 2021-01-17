const express = require("express");
const app = express();
const path = require("path");
// const bodyparser = require('body-parser');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/contact', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;



// Defining mongoose schema
// var contactSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     review: String
// });

// var Contact = mongoose.model('Contact', contactSchema);




app.use(express.static(path.join(__dirname, "mainwebsite")));

app.get("/", (req, res)=>{
    // const params = { }
    // res.status(200).render('main.html', params)
     res
     .status(200)
     .sendFile(path.join(__dirname, "mainwebsite", "main.html"));
    
});

// app.post("/contact", (req, res)=>{
//     var myData = new Contact(req.body);
//     myData.save().then(()=>{
//         res.send("This item has been saved to Database")
//     }).catch(()=>{
//         res.status(400).send("Item was not saved in database")
//     });
//     res.status(200).render('main.html', params)
//     // res
//     // .status(200)
//     // .sendFile(path.join(__dirname, "mainwebsite", "main.html"));
    
// });



app.listen(port, ()=>{
    console.log(`The app is runnig at port ${port}`);
    
});