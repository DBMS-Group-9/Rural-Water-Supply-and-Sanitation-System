const express = require('express');
const router = express.Router();
const connection = require('./../db');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('./../config');

router.post('/login', (req, res, next) => {
    connection.query(`SELECT * from Employees where username='${req.body.Username}'`, function (err, result) {
        if(err) {
            res.status(500).json({ message: err.toString() });
            return;
        }
        if(result[0].length === 0) {
            res.status(401).json({ message: "Username/Password Incorrect!" });
            return;
        }
        result = result[0];
        if(bcrypt.compareSync(req.body.Password,result.Password)) {
            let token = jwt.sign({ Username: result.Username, JobCode: result.JobCode }, config.secret);
            connection.query(`Select * from Jobs where JobCode=${result.JobCode}`, function (err, jobResult) {
                if(err) {
                    res.status(500).json({ message: err.toString() });
                    return;
                }
                res.status(200).json({ message: "Login Successful!", Token: token, Designation: jobResult[0].Designation });
            });            
        }
        else {
            res.status(401).json({ message: "Username/Password Incorrect!" });
        }
    });
});

module.exports = router;