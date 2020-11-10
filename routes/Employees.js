const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

async function addEmployee(FName, LName, EContact, JobCode, Pincode, Username, Password) {
    try {

        await connection.query(`INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('${FName}','${LName}',${EContact},${JobCode},${Pincode}, '${Username}', '${Password}')`, function (err, result) {
            if(err) throw err;
            return { status: 200, response: { message: "Employee Added Successfully!" } };
        });
    } catch (err) {
        return { status: 400, response: { message: err.toString() } };
    }
};

router.post('/addemployee', (req, res, next) => {
    let resdata;
    addEmployee(req.body.FName, req.body.LName, req.body.EContact, req.body.JobCode, req.body.Pincode, req.body.Username, req.body.Password)
        .then(message => resdata = message)
        .catch(err => resdata = config.errorResponse)
        .finally(() => res.status(resdata.status).json(resdata.response));
});

module.exports = router;

