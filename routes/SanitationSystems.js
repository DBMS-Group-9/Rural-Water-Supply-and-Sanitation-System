const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

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
    connection.query(`SELECT * from SanitationSystems where SStatus='Planned`, function (err, result) {
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

router.post('/approvesanitationsystem', (req, res, next) => {
    console.log(req.body);
    if(req.body.SStatus === 'Approved'){
        connection.query(`update SanitationSystems SET SStatus='Approved' where SSID=${req.body.SSID}`, function (err, result) {
            if(err) {
                res.status(500).json({ message: err.toString() });
                return;
            }
            res.status(200).json({ message: "Sanitation System Approved and Status has been Updated Successfully!" });
        });
    }
    
});

router.post('/updatesanitationsystemstatus', (req, res, next) => {
    console.log(req.body);
    if(req.body.SStatus === 'Under-maintenance'){
        connection.query(`update SanitaionSystems SET SStatus='Under-maintenance' where SSID=${req.body.SSID}`, function (err, result) {
            if(err) {
                res.status(500).json({ message: err.toString() });
                return;
            }
            res.status(200).json({ message: "Sanitation System Approved and Status has been Updated Successfully!" });
        });
    }
    else if(req.body.SStatus === 'Under-construction'){
        connection.query(`update SanitaionSystems SET SStatus='Under-construction' where SSID=${req.body.SSID}`, function (err, result) {
            if(err) {
                res.status(500).json({ message: err.toString() });
                return;
            }
            res.status(200).json({ message: "Sanitation System Approved and Status has been Updated Successfully!" });
        });
    }
    else{
        connection.query(`update SanitaionSystems SET SStatus='Working' where SSID=${req.body.SSID}`, function (err, result) {
            if(err) {
                res.status(500).json({ message: err.toString() });
                return;
            }
            res.status(200).json({ message: "Sanitation System Approved and Status has been Updated Successfully!" });
        });
    }
    
});

module.exports = router;

