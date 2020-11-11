const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.get('/getallexpences', (req, res, next) => {
    connection.query(`SELECT * from Expenditures`, function (err, result) {
        if(err) {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Expenditures Fetched Successfully!", result });
    });
});

router.post('/addexpenditure', (req, res, next) => {
    connection.query(`INSERT into Expenditures(ExpenseID,EDate,EmpID,WSID,SSID,EAmount) values(${req.body.ExpenseID},'${req.body.EDate}',${req.body.EmpID},${req.body.WSID},${req.body.SSID},${req.body.EAmount})`, function (err, result) {
        if(err){
            res.status(500).json({ message: err.toString() });
            return;
        } 
        res.status(200).json({ message: "Expenditure Added Successfully!" });
    });
});

module.exports = router;

