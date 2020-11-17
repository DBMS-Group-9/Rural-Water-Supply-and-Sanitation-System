drop database RuralWaterSupplyAndSanitationSystem;

CREATE DATABASE IF NOT EXISTS RuralWaterSupplyAndSanitationSystem;

use RuralWaterSupplyAndSanitationSystem;

CREATE TABLE IF NOT EXISTS Locations
	(
		Pincode int not null, 
		Panchayat varchar(15), 
		District varchar(20), 
		constraint pk_Pincode primary key (Pincode)
	);

CREATE TABLE IF NOT EXISTS Jobs 
	(
		JobCode int not null AUTO_INCREMENT, 
		Designation varchar(20), 
		Shift varchar(15), 
		constraint pk_JobCode primary key (JobCode)
	);

CREATE TABLE IF NOT EXISTS Employees
					(
						EmpID int not null AUTO_INCREMENT,
						FName varchar(20), 
						LName varchar(20), 
						EContact BIGINT, 
						JobCode int, 
						Pincode int, 
						Username varchar(35),
						Password varchar(60) not null,
						constraint pk_EmpID primary key (EmpID), 
						constraint fk_JobCode FOREIGN KEY(JobCode) REFERENCES Jobs(JobCode), 
						constraint fk_Pincode FOREIGN KEY(Pincode) REFERENCES Locations(Pincode) 
					);

CREATE TABLE IF NOT EXISTS WaterSources
					(
						WSID int not null AUTO_INCREMENT,
						WStatus varchar(20), 
						WEstimation int, 
						WCapacity int, 
						Pincode int, 
						constraint pk_WSID primary key (WSID), 
						constraint fk_WPincode FOREIGN KEY(Pincode) REFERENCES Locations(Pincode) 
					);

CREATE TABLE IF NOT EXISTS WaterUsages
					(
						WSID int not null,
						Month varchar(10) not null, 
						Year int not null, 
						Usages int, 
						constraint pk_WSID_MONTH_YEAR primary key (WSID, Month, Year), 
						constraint fk_WSID FOREIGN KEY(WSID) REFERENCES WaterSources(WSID) 
					);

create table if not exists SanitationSystems 
					(
						SSID int not null AUTO_INCREMENT,
						SStatus varchar(20), 
						SEstimation int, 
						Pincode int, 
						constraint pk_SSID primary key (SSID), 
						constraint fk_SPincode FOREIGN KEY(Pincode) REFERENCES Locations(Pincode) 
					);

create table if not exists Families 
					(
						FID int not null AUTO_INCREMENT, 
						Persons int, 
						FHead varchar(10), 
						FContact BIGINT, 
						Pincode int, 
						constraint pk_FID primary key (FID), 
						constraint fk_FPincode FOREIGN KEY(Pincode) REFERENCES Locations(Pincode)  
					);

create table if not exists Donations 
                   (
					  TransactionID varchar(20) not null, 
					  AccountNumber varchar(25), 
                      Amount decimal(10,2), 
                      DContact BIGINT, 
                      DDate varchar(25), 
                      constraint pk_TransactionID primary key (TransactionID)  
                   );

create table if not exists Expenditures 
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
					);

INSERT into Locations(Pincode, Panchayat, District) values(641113, 'Velauthapuram', 'Coimbatore');
INSERT into Locations(Pincode, Panchayat, District) values(642202, 'Nagarakalandai', 'Coimbatore');
INSERT into Locations(Pincode, Panchayat, District) values(638107, 'Andi Kadu', 'Erode');
INSERT into Locations(Pincode, Panchayat, District) values(624101, 'Adukkam', 'Dindigul');
INSERT into Locations(Pincode, Panchayat, District) values(614803, 'Ambalpuram', 'Thanjavur');
INSERT into Locations(Pincode, Panchayat, District) values(632113, 'Dharmapuram', 'Vellore');
INSERT into Locations(Pincode, Panchayat, District) values(625534, 'Thadicheri', 'Theni');
INSERT into Locations(Pincode, Panchayat, District) values(636455, 'Kamanari', 'Salem');
INSERT into Locations(Pincode, Panchayat, District) values(625006, 'Nethaji Nagar', 'Madurai');
INSERT into Locations(Pincode, Panchayat, District) values(641664, 'Elavanthi', 'Tiruppur');
INSERT into Locations(Pincode, Panchayat, District) values(638111, 'Kaattur', 'Tiruppur');
INSERT into Locations(Pincode, Panchayat, District) values(638312, 'Chethi Kuttai', 'Erode');
INSERT into Locations(Pincode, Panchayat, District) values(635812, 'Dhayapuram', 'Vellore');

INSERT into Jobs(Designation, Shift) values('Resigned', 'None');
INSERT into Jobs(Designation, Shift) values('Admin', 'Full-time');
INSERT into Jobs(Designation, Shift) values('Planning Engineer', 'Full-time');
INSERT into Jobs(Designation, Shift) values('Project Manager', 'Full-time');
INSERT into Jobs(Designation, Shift) values('Accountant', 'Full-time');
INSERT into Jobs(Designation, Shift) values('Operator', 'Full-time');
INSERT into Jobs(Designation, Shift) values('Electrician', 'Morning');
INSERT into Jobs(Designation, Shift) values('Electrician', 'Evening');
INSERT into Jobs(Designation, Shift) values('Electrician', 'Night');
INSERT into Jobs(Designation, Shift) values('Plumber', 'Morning');
INSERT into Jobs(Designation, Shift) values('Plumber', 'Evening');
INSERT into Jobs(Designation, Shift) values('Plumber', 'Night');
INSERT into Jobs(Designation, Shift) values('House Keeping', 'Morning');
INSERT into Jobs(Designation, Shift) values('House Keeping', 'Evening');
INSERT into Jobs(Designation, Shift) values('House Keeping', 'Night');

INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('Ashwin', 'Venkatesan', 9867564361, 1, 641113, 'Ashwin123', '$2y$10$yWM40XxtfG19rJAkq2BZUeOo8pS1khsBsiE7dTCEbWtM.MOH6Jjh2 ');
INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('Senthil', 'Kumar', 8985663421, 2, 642202, 'Senthil143', '$2y$10$bQlyC1ofmQA/KDpMtA1p6u5fwnLad6Wot3CcUtFzseH3IObXcMBDy ');
INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('Ganesh', 'Iyer',	9676415267, 3, 638107, 'Ganesh777', '$2y$10$AP8B8mWgf82wmatlnFpyvOvGBmhXYQ0ggHQgsCDk2JGsagM.CTNj2 ');
INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('Suresh', 'Nair',	9989432678, 4, 624101, 'Suresh000', '$2y$10$M5ZxR7g3O5gM89ZV38wzfO1ew2PIpP2a2GKf2/.CpXPRqlXRXKXTG ');
INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('Rama', 'Rao', 8884587239, 5, 614803, 'Rama67', '$2y$10$LvPshYX98rpE55/PknILTO8Bh/9NgtKd9zHE3R7Orv2/ybA8Qlk8. ');
INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('Ashwin', 'Raman', 9876523465, 6, 632113, 'Ashwin111', '$2y$10$YUvK/C5774DYjMXWiUN7KOZJhkMXoJxr7a4gkHBHWuD8.ROMpAJu6 ');
INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('Ramachandra', 'Iyer', 9987643257, 7, 625534, 'RamachandraIyer1', '$2y$10$Sox25w6ctaEmP5H90.u9Cu/xQjtiUbKKzoDC68ZSzclUILb77AFVu ');
INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('Deva', 'Pillai',	9876345656, 8, 636455, 'Deva23', '$2y$10$RcO1DqwRy5asYyPeZoRtx.kEM/mP2/Ih2ifeCyqF9mPsiOFsZhkBC ');
INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('Dharun', 'Venkatesah', 8308456579, 9, 625006, 'Dharun18', '$2y$10$8QJBacuzdOx1aBOtB5d.y.CJO.Df5uYvPpc3vJQyZoao04n0ew4iO ');
INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('Kavin', 'Thevar', 9441343733, 10, 641664, 'Kavin123', '$2y$10$E12xTvxkvc7botydSeBpoObfwF5fXJTSbgiwvU9qgysU9lNZWMX6e ');
INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('Ezhil', 'Nadar', 9441343733, 11, 638111, 'Ezhil007', '$2y$10$NE3erVD3gyZRELSQCZmv8O7VI6HkE4rJ0cqa0Bj2OsJbdC/VfwrxC ');
INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('Gowri', 'Swaminathan', 9441343733, 12, 638312, 'Gowri001', '$2y$10$OECBKlzKUGFYesJV3D1eD.IS.dkmA.JjeTWguLlNXKZkZB6a5KF4e ');
INSERT into Employees(FName, LName, EContact, JobCode, Pincode, Username, Password) values('Balaji', 'Krishnamoorthy', 9441343733, 13, 635812, 'Balaji1234', '$2y$10$M7wg9mYGruvQ0X25bhiL.eitbkVr.O.i2AupXTmtZtADqHZteHdme ');

INSERT into WaterSources(WStatus, WEstimation, WCapacity, Pincode) values('Working', 720000, 50000, 641113);
INSERT into WaterSources(WStatus, WEstimation, WCapacity, Pincode) values('Planned', 1500000, 120000, 642202);
INSERT into WaterSources(WStatus, WEstimation, WCapacity, Pincode) values('Working', 800000, 55000, 638107);
INSERT into WaterSources(WStatus, WEstimation, WCapacity, Pincode) values('Under-construction', 600000, 40000, 624101);
INSERT into WaterSources(WStatus, WEstimation, WCapacity, Pincode) values('Working', 1000000, 75000, 614803);
INSERT into WaterSources(WStatus, WEstimation, WCapacity, Pincode) values('Approved', 1200000, 90000, 632113);
INSERT into WaterSources(WStatus, WEstimation, WCapacity, Pincode) values('Working', 2000000, 150000, 625534);
INSERT into WaterSources(WStatus, WEstimation, WCapacity, Pincode) values('Under-maintenance', 1700000, 135000, 636455);
INSERT into WaterSources(WStatus, WEstimation, WCapacity, Pincode) values('Working', 850000, 60000, 625006);
INSERT into WaterSources(WStatus, WEstimation, WCapacity, Pincode) values('Approved', 1100000, 80000, 641664);
INSERT into WaterSources(WStatus, WEstimation, WCapacity, Pincode) values('Working', 1250000, 100000, 638111);
INSERT into WaterSources(WStatus, WEstimation, WCapacity, Pincode) values('Under-construction', 1200000, 90000, 638312);
INSERT into WaterSources(WStatus, WEstimation, WCapacity, Pincode) values('Working', 1600000, 125000, 635812);

INSERT into WaterUsages(WSID, Month, Year, Usages) values(1, 'March', 2020, 20000);
INSERT into WaterUsages(WSID, Month, Year, Usages) values(3, 'May', 2020, 60000);
INSERT into WaterUsages(WSID, Month, Year, Usages) values(5, 'July', 2020, 30000);
INSERT into WaterUsages(WSID, Month, Year, Usages) values(7, 'September', 2020, 40000);
INSERT into WaterUsages(WSID, Month, Year, Usages) values(8, 'March', 2020, 50000);
INSERT into WaterUsages(WSID, Month, Year, Usages) values(9, 'April', 2020, 80000);
INSERT into WaterUsages(WSID, Month, Year, Usages) values(11, 'July', 2020, 35000);
INSERT into WaterUsages(WSID, Month, Year, Usages) values(13, 'October', 2020,40000);

INSERT into SanitationSystems(SStatus, SEstimation, Pincode) values('Working', 720000, 641113);
INSERT into SanitationSystems(SStatus, SEstimation, Pincode) values('Planned', 1500000, 642202);
INSERT into SanitationSystems(SStatus, SEstimation, Pincode) values('Working', 800000, 638107);
INSERT into SanitationSystems(SStatus, SEstimation, Pincode) values('Under-construction', 600000, 624101);
INSERT into SanitationSystems(SStatus, SEstimation, Pincode) values('Working', 1000000, 614803);
INSERT into SanitationSystems(SStatus, SEstimation, Pincode) values('Approved', 1200000, 632113);
INSERT into SanitationSystems(SStatus, SEstimation, Pincode) values('Working', 2000000, 625534);
INSERT into SanitationSystems(SStatus, SEstimation, Pincode) values('Under-maintenance', 1700000, 636455);
INSERT into SanitationSystems(SStatus, SEstimation, Pincode) values('Working', 850000, 625006);
INSERT into SanitationSystems(SStatus, SEstimation, Pincode) values('Approved', 1100000, 641664);
INSERT into SanitationSystems(SStatus, SEstimation, Pincode) values('Working', 1250000, 638111);
INSERT into SanitationSystems(SStatus, SEstimation, Pincode) values('Under-construction', 1200000, 638312);
INSERT into SanitationSystems(SStatus, SEstimation, Pincode) values('Working', 1600000, 635812);

INSERT into Families(Persons, FHead, FContact, Pincode) values(4, 'Amit', 7358973592, 641113);
INSERT into Families(Persons, FHead, FContact, Pincode) values(3, 'Vijay', 9391357915, 642202);
INSERT into Families(Persons, FHead, FContact, Pincode) values(8, 'Manoj', 9989763459, 638107);
INSERT into Families(Persons, FHead, FContact, Pincode) values(7, 'Thamiz', 9676313275, 624101);
INSERT into Families(Persons, FHead, FContact, Pincode) values(4, 'Pruthvi', 7702184949, 614803);
INSERT into Families(Persons, FHead, FContact, Pincode) values(5, 'Dheeraj', 8985717469, 632113);
INSERT into Families(Persons, FHead, FContact, Pincode) values(3, 'Arun', 9490384823, 625534);
INSERT into Families(Persons, FHead, FContact, Pincode) values(6, 'Subhas', 8356983593, 636455);
INSERT into Families(Persons, FHead, FContact, Pincode) values(4, 'Dinesh', 9441754535, 625006);
INSERT into Families(Persons, FHead, FContact, Pincode) values(6, 'Anthony', 8886433659, 641664);
INSERT into Families(Persons, FHead, FContact, Pincode) values(8, 'Shahul', 8919818747, 638111);
INSERT into Families(Persons, FHead, FContact, Pincode) values(7, 'Arya', 9440115648, 638312);
INSERT into Families(Persons, FHead, FContact, Pincode) values(4, 'Amir', 9491186703, 635812);

INSERT into Donations(TransactionID, AccountNumber, Amount, DContact, DDate) values('006422098756', '4201255581669610', 10000000, 9440113323, '01-01-2017');
INSERT into Donations(TransactionID, AccountNumber, Amount, DContact, DDate) values('023069645875', '2453908289710560', 20000000, 8985104502, '26-01-2018');
INSERT into Donations(TransactionID, AccountNumber, Amount, DContact, DDate) values('004322078656', '3438145988859762', 2500000, 9666666111, '18-01-20218');
INSERT into Donations(TransactionID, AccountNumber, Amount, DContact, DDate) values('027123146545', '1699475293504289', 5000000, 8939839562, '08-03-2018');
INSERT into Donations(TransactionID, AccountNumber, Amount, DContact, DDate) values('084128654598', '4776588817399114', 2000000, 9491190236, '08-02-2019');
INSERT into Donations(TransactionID, AccountNumber, Amount, DContact, DDate) values('017772314654', '4201255581669610', 1000000, 8500516588, '04-09-2019');
INSERT into Donations(TransactionID, AccountNumber, Amount, DContact, DDate) values('012314657943', '2897105602453908', 7500000, 8939536621, '22-03-2019');
INSERT into Donations(TransactionID, AccountNumber, Amount, DContact, DDate) values('054343220786', '4297863816696107', 700000, 7072523231, '23-08-2019');
INSERT into Donations(TransactionID, AccountNumber, Amount, DContact, DDate) values('009865322076', '3816696104297864', 1500000, 7093612123, '30-05-2020');
INSERT into Donations(TransactionID, AccountNumber, Amount, DContact, DDate) values('054355467799', '5293504289169947', 500000, 9440123252, '22-09-2020');
INSERT into Donations(TransactionID, AccountNumber, Amount, DContact, DDate) values('011870642209', '5558166961042012', 100000, 9849823235, '27-07-2020');
INSERT into Donations(TransactionID, AccountNumber, Amount, DContact, DDate) values('090642349895', '2935169947504289', 250000, 8883235610, '07-07-2020');
INSERT into Donations(TransactionID, AccountNumber, Amount, DContact, DDate) values('076422098776', '2555816420169610', 1000000, 9633692310, '30-04-2020');

INSERT into Expenditures( EDate, EmpID, WSID, SSID, EAmount) values('18-01-2018', 5, 1, null, 720000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('04-03-2018', 5, 3, null, 800000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('22-05-2020', 5, 4, null, 600000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('22-05-2018', 5, 5, null, 1000000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('22-05-2020', 5, 6, null, 1200000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('05-07-2019', 5, 7, null, 2000000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('30-01-2019', 5, 8, null, 1700000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('28-03-2020', 5, 9, null, 850000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('10-05-2020', 5, 10, null, 1100000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('10-05-2019', 5, 11, null, 1250000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('07-01-2020', 5, 12, null, 1200000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('27-08-2020', 5, 13, null, 1600000);
INSERT into Expenditures( EDate, EmpID, WSID, SSID, EAmount) values( '18-01-2018', 5, null, 1, 720000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('04-03-2018', 5, null, 3, 800000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values( '22-05-2020', 5, null, 4, 600000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values( '22-05-2018', 5, null, 5, 1000000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values( '22-05-2020', 5, null, 6, 1200000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('05-07-2019', 5, null, 7, 2000000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('30-01-2019', 5, null, 8, 1700000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('28-03-2020', 5, null, 9, 850000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('10-05-2020', 5, null, 10, 1100000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('10-05-2019', 5, null, 11, 1250000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('07-01-2020', 5, null, 12, 1200000);
INSERT into Expenditures(EDate, EmpID, WSID, SSID, EAmount) values('27-08-2020', 5, null, 13, 1600000);

select * from Jobs;
select * from Employees;