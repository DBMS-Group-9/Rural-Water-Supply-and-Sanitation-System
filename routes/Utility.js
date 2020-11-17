const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');
const verifyToken = require('../middleware/verifyToken');


router.get('/getemergencyjobs', (req, res, next) => {                                       //public
    connection.query(`SELECT Distinct(Designation) as Designation from Jobs where Shift<>'Full-Time' and JobCode<>1`, function (err, result) {
        if(err)
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Jobs Fetched Successfully!", result });
    });
});

router.post('/emergencydetails', (req, res, next) => {                                                              //public
    connection.query(`Select e.EmpID, e.FName, e.LName, e.EContact, j.Designation, j.Shift from Employees e INNER JOIN Jobs j on e.JobCode=j.JobCode  where j.Designation='${req.body.Designation}' and j.Shift='${req.body.Shift}' and e.Pincode = ${req.body.Pincode}`, function (err, result) {
        if(err) {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Employee Details Retrieved Successfully!", result });
    });
});

router.get('/getbalance', verifyToken, (req, res, next) => {
    if(req.userDetails.Designation !== 'Accountant'){
        res.status(400).json({ message: "Only Accountants are Allowed to get balance funds!" });
        return;
    }
    let donationsum = null;
    let expendituresum = null;
    connection.query(`select sum(Amount) from Donations`, function (err, result) {
        if(err)
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        donationsum = result[0];
        connection.query(`select sum(EAmount) from Expenditures`, function (err, result) {
            if(err)
            {
                res.status(500).json({ message: err.toString() });
                return;
            }
            expendituresum = result[0];
            res.status(200).json({ message: "Balance Fetched Successfully", balance: donationsum['sum(Amount)']-expendituresum['sum(EAmount)'] });
        });
    });
});


module.exports = router;