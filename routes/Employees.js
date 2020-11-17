const express = require("express");
const router = express.Router();
const connection = require("./../db");
const config = require("./../config");
const bcrypt = require("bcryptjs");

router.get("/getallemployees", (req, res, next) => {
	if(req.userDetails.Designation !== 'Admin'){
        res.status(400).json({ message: "Only Admins are Allowed to get employee details!" });
        return;
    }
	connection.query(`SELECT * from Employees where JobCode<>1`, function (err, result) {
		if (err) {
			res.status(500).json({ message: err.toString() });
			return;
		}
		res.status(200).json({
			message: "Employees Fetched Successfully!",
			result,
		});
	});
});

router.post("/addemployee", (req, res, next) => {
	if(req.userDetails.Designation !== 'Admin'){
        res.status(400).json({ message: "Only Admins are Allowed to add employees!" });
        return;
    }
	connection.query(
		`INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('${
			req.body.FName
		}','${req.body.LName}',${req.body.EContact},${req.body.JobCode},${
			req.body.Pincode
		},'${req.body.Username}','${bcrypt.hashSync(
			req.body.Password,
			+config.hashsecret
		)}')`,
		function (err, result) {
			if (err) {
				res.status(500).json({ message: err.toString() });
				return;
			}
			res.status(200).json({ message: "Employee Added Successfully!" });
		}
	);
});

router.post("/markresigned", (req, res, next) => {
	console.log(req.body);
	if(req.userDetails.Designation !== 'Admin'){
        res.status(400).json({ message: "Only Admins are Allowed to mark an employee resignation!" });
        return;
    }
	connection.query(
		`update Employees SET JobCode=1 where EmpID=${req.body.EmpID}`,
		function (err, result) {
			if (err) {
				res.status(500).json({ message: err.toString() });
				return;
			}
			res.status(200).json({ message: "Employee Marked Resigned!" });
		}
	);
});

module.exports = router;
