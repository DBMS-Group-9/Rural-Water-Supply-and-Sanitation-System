const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.get('/getallwatersources', (req, res, next) => {
    connection.query(`SELECT * from WaterSources`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Water Sources Fetched Successfully!", result });
    });
});


router.post('/addwatersource', (req, res, next) => {
    connection.query(`INSERT into WaterSources(WStatus,WEstimation,WCapacity,Pincode) values('${req.body.WStatus}',${req.body.WEstimation},${req.body.WCapacity},${req.body.Pincode})`, function (err, result) {
        if(err) {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Water Source Added Successfully!" });
    });
});

module.exports = router;

