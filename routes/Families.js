const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.post('/addfamily', (req, res, next) => {
    connection.query(`INSERT into Employees(Persons, FHead, Consumption, FContact, Pincode) values(${req.body.Persons},'${req.body.FHead}',${req.body.Consumption},${req.body.FContact},${req.body.Pincode})`, function (err, result) {
        if(err){
            res.status(500).json({ message: err.toString() });
            return;
        } 
        res.status(200).json({ message: "Family Added Successfully!" });
    });
});

module.exports = router;

