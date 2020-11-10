const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.post('/addsanitationsystem', (req, res, next) => {
    connection.query(`INSERT into SanitationSystems(SStatus,SEstimation,Pincode) values('${req.body.SStatus}',${req.body.SEstimation},${req.body.Pincode})`, function (err, result) {
        if(err) {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Sanitation System Added Successfully!" });
    });
});

module.exports = router;

