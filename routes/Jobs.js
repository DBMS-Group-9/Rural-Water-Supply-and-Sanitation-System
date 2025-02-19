const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.get('/getalljobs', (req, res, next) => {
    if(req.userDetails.Designation !== 'Admin'){
        res.status(400).json({ message: "Only Admins are Allowed to Get Jobs!" });
        return;
    }
    connection.query(`SELECT * from Jobs where JobCode<>1`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Jobs Fetched Successfully!", result });
    });
});

router.post('/addjob', (req, res, next) => {
    if(req.userDetails.Designation !== 'Admin'){
        res.status(400).json({ message: "Only Admins are Allowed to Add Jobs!" });
        return;
    }
    connection.query(`INSERT into Jobs(Designation, Shift) values('${req.body.Designation}', '${req.body.Shift}')`, function (err, result) {
        if(err){
            res.status(500).json({ message: err.toString() });
            return;
        } 
        res.status(200).json({ message: "New Job Added Successfully!" });
    });
});

module.exports = router;