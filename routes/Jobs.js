const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

async function addJob(Designation, Shift) {
    try {

        await connection.query(`INSERT into Jobs(Designation, Shift) values('${Designation}', '${Shift}')`, function (err, result) {
            if(err) throw err;
            return { status: 200, response: { message: "New Job Added Successfully!" } };
        });
    } catch (err) {
        return { status: 400, response: { message: err.toString() } };
    }
};

router.post('/addjob', (req, res, next) => {
    let resdata;
    addJob(Designation, req.body.Shift)
        .then(message => resdata = message)
        .catch(err => resdata = config.errorResponse)
        .finally(() => res.status(resdata.status).json(resdata.response));
});

module.exports = router;