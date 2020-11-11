const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.get('/getallwaterusages', (req, res, next) => {
    connection.query(`SELECT * from WaterUsages`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Water Usages Fetched Successfully!", result });
    });
});

router.post('/addwaterusage', (req, res, next) => {
    console.log(req.body);
    connection.query(`INSERT into WaterUsages(WSID,Month,Year,Usages) values(${req.body.WSID},'${req.body.Month}',${req.body.Year},${req.body.Usages})`, function (err, result) {
        if(err) {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Water Usage Recorded Successfully!" });
    });
});

module.exports = router;