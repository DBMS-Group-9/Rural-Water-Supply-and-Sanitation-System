const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.get('/getalllocations', (req, res, next) => {
    connection.query(`SELECT * from Locations`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Locations Fetched Successfully!", result });
    });
});

router.post('/addlocation', (req, res, next) => {
    connection.query(`INSERT into Locations(Pincode, Panchayat, District) values(${req.body.Pincode}, '${req.body.Panchayat}', '${req.body.District}')`, function (err, result) {
        if(err)
        {
            res.status(500).json({ message: err.toString() });
            return
        }
        res.status(200).json({ message: "Location Added Successfully!" });
    });
});

module.exports = router;