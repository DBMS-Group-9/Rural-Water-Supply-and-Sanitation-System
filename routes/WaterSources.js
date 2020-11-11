const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.get('/getallwatersources', (req, res, next) => {
    connection.query(`SELECT * from WaterSources`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Water Sources Fetched Successfully!", result });
    });
});

router.get('/getallplannedwatersources', (req, res, next) => {
    connection.query(`SELECT * from WaterSources where WStatus='Planned`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Water Sources Fetched Successfully!", result });
    });
});

router.get('/getallapprovedwatersources', (req, res, next) => {
    connection.query(`SELECT * from WaterSources where WStatus<>'Planned'`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Water Sources Fetched Successfully!", result });
    });
});

router.post('/addwatersource', (req, res, next) => {
    console.log(req.body);
    connection.query(`INSERT into WaterSources(WStatus,WEstimation,WCapacity,Pincode) values('${req.body.WStatus}',${req.body.WEstimation},${req.body.WCapacity},${req.body.Pincode})`, function (err, result) {
        if(err) {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Water Source Added Successfully!" });
    });
});

router.post('/approvewatersource', (req, res, next) => {
    console.log(req.body);
    if(req.body.WStatus === 'Approved'){
        connection.query(`update WaterSources SET WStatus='Approved' where WSID=${req.body.WSID}`, function (err, result) {
            if(err) {
                res.status(500).json({ message: err.toString() });
                return;
            }
            res.status(200).json({ message: "Water Source Approved and Status has been Updated Successfully!" });
        });
    }
    
});

router.post('/updatewatersourcestatus', (req, res, next) => {
    console.log(req.body);
    if(req.body.WStatus === 'Under-maintenance'){
        connection.query(`update WaterSources SET WStatus='Under-maintenance' where WSID=${req.body.WSID}`, function (err, result) {
            if(err) {
                res.status(500).json({ message: err.toString() });
                return;
            }
            res.status(200).json({ message: "Water Source Approved and Status has been Updated Successfully!" });
        });
    }
    else if(req.body.WStatus === 'Under-construction'){
        connection.query(`update WaterSources SET WStatus='Under-construction' where WSID=${req.body.WSID}`, function (err, result) {
            if(err) {
                res.status(500).json({ message: err.toString() });
                return;
            }
            res.status(200).json({ message: "Water Source Approved and Status has been Updated Successfully!" });
        });
    }
    else{
        connection.query(`update WaterSources SET WStatus='Working' where WSID=${req.body.WSID}`, function (err, result) {
            if(err) {
                res.status(500).json({ message: err.toString() });
                return;
            }
            res.status(200).json({ message: "Water Source Approved and Status has been Updated Successfully!" });
        });
    }
    
});

module.exports = router;

