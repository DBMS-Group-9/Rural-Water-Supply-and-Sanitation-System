const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.get('/getallwaterusage', (req, res, next) => {
    connection.query(`SELECT * from WaterUsage`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Water Usage Fetched Successfully!", result });
    });
});

router.post('/addwaterusage', (req, res, next) => {
    connection.query(`INSERT into WaterUsage(WSID,Month,Year,Usages) values(${req.body.WSID},${req.body.Month},${req.body.Year},${req.body.Usages})`, function (err, result) {
        if(err) {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Water Usage Recorded Successfully!" });
    });
});

module.exports = router;
