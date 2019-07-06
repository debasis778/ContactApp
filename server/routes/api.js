const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = require('../models/contact');

const db ="mongodb://debasis:deb12345@ds347707.mlab.com:47707/contactapp";
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
    if(err){
        console.error("Error!: "+err);
    }
    else{
        console.log("database connection successful!");
    }
});

//REST API using Nodejs and mongoose and Mlab - TASK1
//default api address
router.get('/',(req,res)=>{
    res.send("API works!");
})
// Display all the contact from DB
router.get('/contacts', function(req,res){
    console.log("get request for all the contacts");
    Contact.find({})
    .exec(function(err,contacts){
        if(err){
            console.log("Error retrieving contacts!");
        }else{
            res.json(contacts);
        }
    });
});
// Display only particular id from DB
router.get('/contacts/:id', function(req,res){
    console.log("get request for a single contact");
    Contact.findById(req.params.id)
    .exec(function(err,contact){
        if(err){
            console.log("Error retrieving contact!");
        }else{
            res.json(contact);
        }
    });
});
//posting data to database
router.post('/contact',function(req,res){
    console.log("add a contact");
    var newContact = new Contact();
    newContact.name = req.body.name;
    newContact.age = req.body.age;
    newContact.gender =req.body.gender;
    newContact.mnumber = req.body.mnumber;
    newContact.save(function(err, insertedContact){
        if(err){
            console.log("Error adding contact!: "+err);
        }
        else{
            console.log("new contacted added successfully!");
            res.json(insertedContact);
        }
    });
});
//updating a contact by id and using PUT
router.put('/contact/:id', function(req,res){
    console.log('update a contact');
    Contact.findByIdAndUpdate(req.params.id,
        {
            $set :{name : req.body.name,age : req.body.age, gender : req.body.gender, mnumber : req.body.mnumber}
        },
        {
            new : true
        },
        function(err,updatedContact){
            if(err){
                console.log("Error updating contact!");
            }
            else{
                console.log("contact has been updated!");
                res.json(updatedContact);
            }
        });
});
//delete a contact by id
router.delete('/contact/:id', function(req,res){
    console.log("delete a contact");
    Contact.findByIdAndRemove(req.params.id,function(err, deleteContact){
        if(err){
            console.log("error deleting a contact!");
        }
        else{
            console.log("Contact deleted!");
            res.json(deleteContact);
        }
    });
});
module.exports = router;