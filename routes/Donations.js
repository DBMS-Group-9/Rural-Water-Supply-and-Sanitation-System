const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.get('/getalldonations', (req, res, next) => {
    connection.query(`SELECT * from Donations`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Donations Fetched Successfully!", result });
    });
});

router.post('/adddonation', (req, res, next) => {
    connection.query(`INSERT into Donations(TransactionID,AccountNumber,Amount,DContact,DDate) values('${req.body.TransactionID}',${req.body.AccountNumber},${req.body.Amount},${req.body.DContact},'${req.body.DDate}')`, function (err, result) {
        if(err){
            res.status(500).json({ message: err.toString() });
            return;
        } 
        res.status(200).json({ message: "Donation Made Successfully!" });
    });
});

module.exports = router;

