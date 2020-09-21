const express = require('express');
const router = express.Router();
const passport = require('passport');
// Load User model
const Notes = require('../models/Notes');
const { ensureAuthenticated, forwardAuthenticated, isLoggedin } = require('../config/auth');


router.post('/dashboard', ensureAuthenticated, isLoggedin, (req,res)=> {

    const { title, note, email } = req.body;


    let errors = [];

    if (!title || !note ) {
        errors.push({ msg: 'Please enter all fields' });
    }
    
    if(errors.length > 0 ){

        res.render('dashboard', {
            title,
            note,
            user: req.user,
            errors,
            email
        })

    }

    else{

        const newNotes = new Notes({
            title,
            note,
            email
        })

        newNotes.save().then(note=>{
            req.flash(
                'success_msg',
                'Your Note Have Been Saved Succesfully !'
            )
            res.redirect('/dashboard')
        }).catch(err => {console.log('ERROR');
        })

    }

})


// get all notes 

// router.get('/notes', (req,res)=> {
    
//     Notes.find({email: user.email},(err, docs)=> {
//         if (err) console.log('ERR GET');
//         else{
//             res.render('notes',{docs: docs,user:req.body})
//             //console.log(docs);
//         }
//     })

// })

router.get('/notes/:email',ensureAuthenticated, isLoggedin, (req,res)=> {
    
    Notes.find({email: req.params.email},(err, docs)=> {
        if (err) console.log('ERR GET');
        else{

            res.render('notes',{docs: docs,user:req.body})
            //console.log(docs);
        }
    })

})



module.exports = router;
