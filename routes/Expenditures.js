const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.get('/getallexpenditures', (req, res, next) => {
    if(req.userDetails.Designation !== 'Accountant'){
        res.status(400).json({ message: "Only Accountants are Allowed to see Expenditure Details!" });
        return;
    }
    connection.query(`SELECT * from Expenditures`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Expenditures Fetched Successfully!", result });
    });
});

module.exports = router;