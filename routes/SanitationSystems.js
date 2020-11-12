const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');
const VerifyToken = require('../middleware/verifyToken');

router.get('/getallsanitationsystems', (req, res, next) => {
    connection.query(`SELECT * from SanitationSystems`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Sanitation Systems Fetched Successfully!", result });
    });
});

router.get('/getallplannedsanitationsystems', (req, res, next) => {
    connection.query(`SELECT * from SanitationSystems where SStatus='Planned'`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Sanitation Systems Fetched Successfully!", result });
    });
});

router.get('/getallapprovedsanitationsystems', (req, res, next) => {
    connection.query(`SELECT * from SanitationSystems where SStatus<>'Planned'`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Sanitation Systems Fetched Successfully!", result });
    });
});


router.post('/addsanitationsystem', (req, res, next) => {
    connection.query(`INSERT into SanitationSystems(SStatus,SEstimation,Pincode) values('${req.body.SStatus}',${req.body.SEstimation},${req.body.Pincode})`, function (err, result) {
        if(err) {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Sanitation System Added Successfully!" });
    });
});

router.post('/approvesanitationsystem', VerifyToken, (req, res, next) => {
    console.log(req.body);
    if(req.body.SStatus === 'Approved'){
        connection.query(`update SanitationSystems SET SStatus='Approved' where SSID=${req.body.SSID}`, function (err, result) {
            if(err) {
                res.status(500).json({ message: err.toString() });
                return;
            }
            var d = new Date();
            var date =
            +("0" + d.getDate()).slice(-2) +
            "-" +
            ("0" + (d.getMonth() + 1)).slice(-2) +
            "-" +
            d.getFullYear();
            connection.query(`insert into Expenditures(EDate,EmpID,WSID,SSID,EAmount) values('${date}',${req.userDetails.EmpID},${null},${req.body.SSID},${req.body.SEstimation})`, function (err, result) {
                if(err) {
                    res.status(500).json({ message: err.toString() });
                    return;
                }
                res.status(200).json({ message: "Sanitation System Approved and Status has been Updated Successfully!" });
            });            
        });
    }
    
});

router.post('/updatesanitationsystemstatus', (req, res, next) => {
    console.log(req.body);
    if(req.body.oldSStatus === 'Approved'){
        if(req.body.SStatus === 'Under-construction'){
            connection.query(`update SanitationSystems SET SStatus='Under-construction' where WSID=${req.body.WSID}`, function (err, result) {
                if(err) {
                    res.status(500).json({ message: err.toString() });
                    return;
                }
                res.status(200).json({ message: "Sanitation System Approved and Status has been Updated Successfully!" });
            });
        }
        else{
            res.status(400).json({ message: "You Cannot" });
        }
    }
    else if(req.body.oldSStatus === 'Under-construction'){
        if(req.body.SStatus === 'Under-maintenance'){
            connection.query(`update SanitationSystems SET SStatus='Under-maintenance' where WSID=${req.body.WSID}`, function (err, result) {
                if(err) {
                    res.status(500).json({ message: err.toString() });
                    return;
                }
                res.status(200).json({ message: "Sanitation System Approved and Status has been Updated Successfully!" });
            });
        }
        else if(req.body.SStatus === 'Working'){
            connection.query(`update SanitationSystems SET SStatus='Working' where WSID=${req.body.WSID}`, function (err, result) {
                if(err) {
                    res.status(500).json({ message: err.toString() });
                    return;
                }
                res.status(200).json({ message: "Sanitation System Approved and Status has been Updated Successfully!" });
            });
        }
        else{
            res.status(400).json({ message: "You Cannot Perform this operation as this is Invalid" });
        }
    }
    else if(req.body.oldSStatus === 'Under-maintenance'){
        if(req.body.SStatus === 'Working'){
            connection.query(`update SanitationSystems SET SStatus='Working' where WSID=${req.body.WSID}`, function (err, result) {
                if(err) {
                    res.status(500).json({ message: err.toString() });
                    return;
                }
                res.status(200).json({ message: "Sanitation System Approved and Status has been Updated Successfully!" });
            });
        }
        else{
            res.status(400).json({ message: "You Cannot Perform this operation as this is Invalid" });
        }
    }
    else{
        if(req.body.SStatus === 'Under-maintenance'){
            connection.query(`update SanitationSystems SET SStatus='Under-maintenance' where WSID=${req.body.WSID}`, function (err, result) {
                if(err) {
                    res.status(500).json({ message: err.toString() });
                    return;
                }
                res.status(200).json({ message: "Sanitation System Approved and Status has been Updated Successfully!" });
            });
        }
        else{
            res.status(400).json({ message: "You Cannot Perform this operation as this is Invalid" });
        }
    }
    
});

module.exports = router;

