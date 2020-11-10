const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.post('/addwaterusage', (req, res, next) => {
    connection.query(`INSERT into WaterSources(Month,Year,Usages) values(${req.body.Month},${req.body.Year},${req.body.Usages})`, function (err, result) {
        if(err) {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Water Usage Recorded Successfully!" });
    });
});

module.exports = router;

//How are we adding the usage? and should WSID be added?