const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

// Get gig list

router.get('/',(req,res) =>
    Gig.findAll().then(gigs=>{
            console.log(gigs);
            res.render('gigs',{
                gigs
            });
        }).catch(err=>{
            console.log(err)
            res.sendStatus(400)
        })
);

// Displa add gig form
router.get('/add',(req,res)=>res.render('add'));

// Add a gig
router.post('/add',(req,res)=>{
    const data={
        title:'Simple Wordpress website',
        technologies:'wordpress,php,html,css',
        budget:'$1000',
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        contact_email:'user1@gmail.com',
    }

    let {title,technologies,budget,description,contact_email} = data;
    Gig.create({
        title,
        technologies,
        budget,
        description,
        contact_email
    })
    .then(gig=>res.redirect('/gigs'))
    .catch(err=>console.log(err));
})
module.exports = router;
