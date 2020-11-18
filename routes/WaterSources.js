const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.get('/getallwatersources', (req, res, next) => {
    if(req.userDetails.Designation !== 'Planning Engineer'){
        res.status(400).json({ message: "Only Planning Engineers are Allowed to get all water sources information!" });
        return;
    }
    connection.query(`SELECT * from WaterSources`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Water Sources Fetched Successfully!", result });
    });
});

router.get('/getworkingwatersources', (req, res, next) => {
    if(req.userDetails.Designation !== 'Operator'){
        res.status(400).json({ message: "Only Operators are Allowed to get all water sources information!" });
        return;
    }
    connection.query(`SELECT * from WaterSources where WStatus='Working' or WStatus='Under-maintenance'`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Water Sources Fetched Successfully!", result });
    });
});

router.get('/getallplannedwatersources', (req, res, next) => {
    if(req.userDetails.Designation !== 'Accountant'){
        res.status(400).json({ message: "Only Accountants are Allowed to get planned water sources information!" });
        return;
    }
    connection.query(`SELECT * from WaterSources where WStatus='Planned'`, function (err, result) {
        if(err) 
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Water Sources Fetched Successfully!", result });
    });
});

router.get('/getallapprovedwatersources', (req, res, next) => {
    if(req.userDetails.Designation !== 'Project Manager'){
        res.status(400).json({ message: "Only Project Manager or Operator are Allowed to approve water sources information!" });
        return;
    }
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
    if(req.userDetails.Designation !== 'Planning Engineer'){
        res.status(400).json({ message: "Only Planning Engineers are Allowed to plan a water source!" });
        return;
    }
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
    if(req.userDetails.Designation !== 'Accountant'){
        res.status(400).json({ message: "Only Accountants are Allowed to approve water source!" });
        return;
    }
    console.log(req.body);
    if(req.body.WStatus === 'Approved'){
        connection.query(`update WaterSources SET WStatus='Approved' where WSID=${req.body.WSID}`, function (err, result) {
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
            connection.query(`insert into Expenditures(EDate,EmpID,WSID,SSID,EAmount) values('${date}',${req.userDetails.EmpID},${req.body.WSID},${null},${req.body.WEstimation})`, function (err, result) {
                if(err) {
                    res.status(500).json({ message: err.toString() });
                    return;
                }
                res.status(200).json({ message: "Water Source Approved and Status has been Updated Successfully!" });
            });            
        });
    }
    
});

router.post('/updatewatersourcestatus', (req, res, next) => {
    if(req.userDetails.Designation !== 'Project Manager'){
        res.status(400).json({ message: "Only Project Manager are Allowed to update water sources status!" });
        return;
    }
    console.log(req.body);
    if(req.body.oldWStatus === 'Approved'){
        if(req.body.WStatus === 'Under-construction'){
            connection.query(`update WaterSources SET WStatus='Under-construction' where WSID=${req.body.WSID}`, function (err, result) {
                if(err) {
                    res.status(500).json({ message: err.toString() });
                    return;
                }
                res.status(200).json({ message: "Water Source Approved and Status has been Updated Successfully!" });
            });
        }
        else{
            res.status(400).json({ message: "You Cannot Perform this operation as this is Invalid" });
        }
    }
    else if(req.body.oldWStatus === 'Under-construction'){
        if(req.body.WStatus === 'Working'){
            connection.query(`update WaterSources SET WStatus='Working' where WSID=${req.body.WSID}`, function (err, result) {
                if(err) {
                    res.status(500).json({ message: err.toString() });
                    return;
                }
                res.status(200).json({ message: "Water Source Approved and Status has been Updated Successfully!" });
            });
        }
        else{
            res.status(400).json({ message: "You Cannot Perform this operation as this is Invalid" });
        }
    }
    else if(req.body.oldWStatus === 'Under-maintenance'){
        if(req.body.WStatus === 'Working'){
            connection.query(`update WaterSources SET WStatus='Working' where WSID=${req.body.WSID}`, function (err, result) {
                if(err) {
                    res.status(500).json({ message: err.toString() });
                    return;
                }
                res.status(200).json({ message: "Water Source Approved and Status has been Updated Successfully!" });
            });
        }
        else{
            res.status(400).json({ message: "You Cannot Perform this operation as this is Invalid" });
        }
    }
    else{
        if(req.body.WStatus === 'Under-maintenance'){
            connection.query(`update WaterSources SET WStatus='Under-maintenance' where WSID=${req.body.WSID}`, function (err, result) {
                if(err) {
                    res.status(500).json({ message: err.toString() });
                    return;
                }
                res.status(200).json({ message: "Water Source Approved and Status has been Updated Successfully!" });
            });
        }
        else{
            res.status(400).json({ message: "You Cannot Perform this operation as this is Invalid" });
        }
    }
    
});

module.exports = router;

