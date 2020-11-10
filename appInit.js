const bcrypt = require("bcryptjs");
const config = require("./config");
const connection = require("./db");

/* -------------------------------- creating settings and superusers --------------------------------- */

function initializer() {
	try {
		connection.connect(function (err) {
			if (err) throw err;
			console.log("Connected to DB Successfully ✅\n");
			console.log("starting to seed admins...");
			const admins = config.admins;
			connection.query(
				`CREATE DATABASE IF NOT EXISTS RuralWaterSupplyAndSanitationSystem`,
				function (err, result) {
					if (err) throw err;
				}
			);

			connection.query(
				`use RuralWaterSupplyAndSanitationSystem`,
				function (err, result) {
					if (err) throw err;
				}
			);

			connection.query(
				`CREATE TABLE IF NOT EXISTS Locations
			(
				Pincode int not null, 
				Panchayat varchar(15), 
				District varchar(20), 
				constraint pk_Pincode primary key (Pincode)
			)
			`,
				function (err, result) {
					if (err) throw err;
				}
			);

			connection.query(
				`CREATE TABLE IF NOT EXISTS Jobs 
			(
				JobCode int not null AUTO_INCREMENT, 
				Designation varchar(20), 
				Shift varchar(15), 
				constraint pk_JobCode primary key (JobCode)
			)
			`,
				function (err, result) {
					if (err) throw err;
				}
			);

			connection.query(
				`CREATE TABLE IF NOT EXISTS Employees
			(
				EmpID int not null AUTO_INCREMENT,
				FName varchar(20), 
				LName varchar(20), 
				EContact int, 
				JobCode int, 
				Pincode int, 
				Username varchar(35),
				Password varchar(60) not null,
				constraint pk_EmpID primary key (EmpID), 
				constraint fk_JobCode FOREIGN KEY(JobCode) REFERENCES Jobs(JobCode), 
				constraint fk_Pincode FOREIGN KEY(Pincode) REFERENCES Locations(Pincode) 
			)
			`,
				function (err, result) {
					if (err) throw err;
				}
			);

			connection.query(
				`CREATE TABLE IF NOT EXISTS WaterSources
			(
				WSID int not null AUTO_INCREMENT,
				WStatus varchar(15), 
				WEstimation int, 
				WCapacity int, 
				Pincode int, 
				constraint pk_WSID primary key (WSID), 
				constraint fk_WPincode FOREIGN KEY(Pincode) REFERENCES Locations(Pincode) 
			)
			`,
				function (err, result) {
					if (err) throw err;
				}
			);

			connection.query(
				`CREATE TABLE IF NOT EXISTS WaterUsages
			(
				WSID int not null,
				Month varchar(10) not null, 
				Year int not null, 
				Usages int, 
				constraint pk_WSID_MONTH_YEAR primary key (WSID, Month, Year), 
				constraint fk_WSID FOREIGN KEY(WSID) REFERENCES WaterSources(WSID) 
			)
			`,
				function (err, result) {
					if (err) throw err;
				}
			);

			connection.query(
				`create table if not exists SanitationSystems 
		(
			SSID int not null AUTO_INCREMENT,
			SStatus varchar(15), 
			SEstimation int, 
			Pincode int, 
			constraint pk_SSID primary key (SSID), 
			constraint fk_SPincode FOREIGN KEY(Pincode) REFERENCES Locations(Pincode) 
		)
			`,
				function (err, result) {
					if (err) throw err;
				}
			);

			connection.query(
				`create table if not exists Families 
		(
			FID int not null AUTO_INCREMENT, 
			Persons int, 
			FHead varchar(10), 
			Consumption int, 
			FContact int, 
			Pincode int, 
			constraint pk_FID primary key (FID), 
			constraint fk_FPincode FOREIGN KEY(Pincode) REFERENCES Locations(Pincode)  
		)
			`,
				function (err, result) {
					if (err) throw err;
				}
			);

			connection.query(
				`create table if not exists Donations 
		(
			TransactionID varchar(6) not null, 
			Accountint int, 
			Amount decimal(10,2), 
			DContact int, 
			DDate varchar(25), 
			constraint pk_TransactionID primary key (TransactionID)  
		)
			`,
				function (err, result) {
					if (err) throw err;
				}
			);

			connection.query(
				`create table if not exists Expenditures 
		(
			ExpenseID int not null AUTO_INCREMENT, 
			EDate varchar(25), 
			EmpID int, 
			WSID int, 
			SSID int, 
			EAmount decimal(10,2), 
			constraint pk_ExpenseID primary key (ExpenseID), 
			constraint fk_EmpID FOREIGN KEY(EmpID) REFERENCES Employees(EmpID), 
			constraint fk_EWSID FOREIGN KEY(WSID) REFERENCES WaterSources(WSID), 
			constraint fk_SSID FOREIGN KEY(SSID) REFERENCES SanitationSystems(SSID)  
		)
			`,
				function (err, result) {
					if (err) throw err;
				}
			);

			connection.query(
				`select * from Jobs where Designation="Admin"`,
				function (err, result) {
					if (err) throw err;
					if (result.length === 0) {
						connection.query(
							`INSERT into Jobs(Designation,Shift) values('Admin', 'Full-time')`,
							function (err, result) {
								if (err) throw err;
							}
						);
					}
				}
			);

			connection.query(
				`select * from Locations where Pincode=000000`,
				function (err, result) {
					if (err) throw err;
					if (result.length === 0) {
						connection.query(
							`INSERT into Locations(Pincode, Panchayat, District) values(000000, 'Panchayat', 'District')`,
							function (err, result) {
								if (err) throw err;
							}
						);
					}
				}
			);

			for (let admin in admins) {
				connection.query(
					`select * from Employees where Username="${admins[admin].Username}"`,
					function (err, result) {
						if (err) throw err;
						if (result.length === 0) {
							connection.query(
								`INSERT into Employees(FName,LName,EContact,JobCode,Pincode,Username,Password) values('${
									admins[admin].FName
								}', '${admins[admin].LName}', ${
									admins[admin].EContact
								}, ${admins[admin].JobCode}, ${
									admins[admin].Pincode
								}, '${
									admins[admin].Username
								}', '${bcrypt.hashSync(
									admins[admin].Password,
									+config.hashsecret
								)}')`,
								function (err, result) {
									if (err) throw err;
									console.log(
										`Admin: ${admins[admin].Username} created`
									);
									if (admin == admins.length - 1) {
										console.log("finished seeding admins ✅\n");
										console.log("App Initialization Complete!");
									}
								}
							);
						} else {
							console.log(
								`Admin: ${admins[admin].Username} - already exists`
							);
							if (admin == admins.length - 1) {
								console.log("finished seeding admins ✅\n");
								console.log("App Initialization Complete!");
							}
						}						
					}
				);
			}
		});
	} catch (error) {
		console.log(error.toString());
	}
}

initializer();
