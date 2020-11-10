const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.get('/getallfamilies', (req, res, next) => {
    connection.query(`SELECT * from Families`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Families Fetched Successfully!", result });
    });
});

router.post('/addfamily', (req, res, next) => {
    connection.query(`INSERT into Families(Persons, FHead, Consumption, FContact, Pincode) values(${req.body.Persons},'${req.body.FHead}',${req.body.Consumption},${req.body.FContact},${req.body.Pincode})`, function (err, result) {
        if(err){
            res.status(500).json({ message: err.toString() });
            return;
        } 
        res.status(200).json({ message: "Family Added Successfully!" });
    });
});

module.exports = router;

