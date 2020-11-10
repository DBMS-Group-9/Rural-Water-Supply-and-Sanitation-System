const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.get('/getallemplyees', (req, res, next) => {
    connection.query(`SELECT * from Employees`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Employees Fetched Successfully!", result });
    });
});

router.post('/addemployee', (req, res, next) => {
    connection.query(`INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('${req.body.FName}','${req.body.LName}',${req.body.EContact},${req.body.JobCode},${req.body.Pincode},'${req.body.Username}','${req.body.Password}')`, function (err, result) {
        if(err) {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Employee Added Successfully!" });
    });
});

module.exports = router;

