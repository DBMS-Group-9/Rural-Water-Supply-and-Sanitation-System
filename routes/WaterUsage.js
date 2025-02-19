const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.get('/getallwaterusages', (req, res, next) => {
    if(req.userDetails.Designation !== 'Operator'){
        res.status(400).json({ message: "Only Operators are Allowed to get all water usage information!" });
        return;
    }
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
    if(req.userDetails.Designation !== 'Operator'){
        res.status(400).json({ message: "Only Operators are Allowed to add water usages!" });
        return;
    }
    console.log(req.body);
    connection.query(`INSERT into WaterUsages(WSID,Month,Year,Usages) values(${req.body.WSID},'${req.body.Month}',${req.body.Year},${req.body.Usages})`, function (err, result) {
        if(err) {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Water Usage Recorded Successfully!" });
    });
});

router.post('/getwaterusagemindate', (req, res, next) => {
    if(req.userDetails.Designation !== 'Operator'){
        res.status(400).json({ message: "Only Operators are Allowed to get water usage min dates!" });
        return;
    }
    connection.query(`SELECT EDate from Expenditures where WSID=${req.body.WSID}`, function (err, result) {
        if (err) {
            res.status(500).json({ message: err.toString() });
            return;
        }
        let dateParts = result[0].EDate.split('-')
        result = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
        console.log(result);
        res.status(200).json({ message: "Water Usage Date Fetched Successfully!", result });
    });
});

module.exports = router;