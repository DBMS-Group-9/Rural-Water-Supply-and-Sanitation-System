const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');
const VerifyToken = require('../middleware/verifyToken');

router.get('/getalllocations', (req, res, next) => {                                                        //public
    connection.query(`SELECT * from Locations`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Locations Fetched Successfully!", result });
    });
});

router.get('/getalldistricts', (req, res, next) => {                                                        //public
    connection.query(`SELECT DISTINCT(District) as District from Locations`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Districts Fetched Successfully!", result });
    });
});


router.get('/getallpanchayats', (req, res, next) => {                                                           //public
    connection.query(`SELECT Panchayat,Pincode from Locations`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Panchayats Fetched Successfully!", result });
    });
});

router.post('/addlocation', VerifyToken, (req, res, next) => {
    if(req.userDetails.Designation !== 'Admin'){
        res.status(400).json({ message: "Only Admins are Allowed to Add Locations!" });
        return;
    }
    connection.query(`INSERT into Locations(Pincode, Panchayat, District) values(${req.body.Pincode}, '${req.body.Panchayat}', '${req.body.District}')`, function (err, result) {
        if(err)
        {
            res.status(500).json({ message: err.toString() });
            return
        }
        res.status(200).json({ message: "Location Added Successfully!" });
    });
});

router.post('/getcorrespondingpanchayats', (req, res, next) => {                                                //public
    connection.query(`SELECT Panchayat, Pincode from Locations where District='${req.body.District}'`, function (err, result) {
        if(err)
        {
            res.status(500).json({ message: err.toString() });
            return
        }
        res.status(200).json({ message: "Panchayats Fetched Successfully!", result });
    });
});


module.exports = router;