const express = require("express");
const router = express.Router();
const connection = require("./../db");
const config = require("./../config");


router.get("/getallstatistics", (req, res, next) => {
	let finalresult = {
		totalDistictsCovered: 0,
		totalPanchayatsCovered: 0,
		totalFamiliesBenefitted: 0,
		totalPeopleBenefitted: 0,
		totalDonations: 0,
		totalExpenditure: 0,
		totalWaterSourcesConstructed: 0,
		totalSanitationSystemsConstructed: 0,		
		totalConstuctedBarGraph: [],
		waterSourcesStatusPieChart: [],
		sanitationSystemsStatusPieChart: [],
	};
	connection.query(
		`Select count(distinct district) as districtcount, count(distinct panchayat) as panchayatcount from Locations`,
		function (err, result) {
			if (err) {
				res.status(500).json({ message: err.toString() });
				return;
			}
			console.log('Locations: ', result);
			finalresult.totalDistictsCovered = result[0].districtcount;
			finalresult.totalPanchayatsCovered = result[0].panchayatcount;
			connection.query(
				`Select count(FID) as familycount, sum(Persons) as peoplecount from Families`,
				function (err, result) {
					if (err) {
						res.status(500).json({ message: err.toString() });
						return;
					}
					console.log('Families: ', result);
					finalresult.totalFamiliesBenefitted = result[0].familycount;
					finalresult.totalPeopleBenefitted = result[0].peoplecount;
					connection.query(
						`Select sum(Amount) as totaldonations, sum(EAmount) as totalexpenditure from Donations, Expenditures`,
						function (err, result) {
							if (err) {
								res.status(500).json({ message: err.toString() });
								return;
							}
							console.log('Donations: ', result);
							finalresult.totalDonations = result[0].totaldonations;
							finalresult.totalExpenditure = result[0].totalexpenditure;
							connection.query(
								`SELECT EDate, WSID, SSID from Expenditures`,
								function (err, result) {
									if (err) {
										res.status(500).json({ message: err.toString() });
										return;
									}
									console.log('constructedProjects: ', result);
									let constructedObjects = {};
									for (let eachresult of result) {
										let year = eachresult.EDate.split('-')[2];
										if(constructedObjects[year]) {
											if(eachresult.WSID)
												constructedObjects[year].ws += 1
											else
												constructedObjects[year].ss += 1
										}
										else {
											if(eachresult.WSID)
												constructedObjects[year] = { ws: 1, ss: 0 }
											else
												constructedObjects[year] = { ss: 1, ws: 0 }
										}
									}
									for(let key in constructedObjects) {
										let eachObject = {
											'name': key.toString(),
											'Water Sources': constructedObjects[key].ws,
											'Sanitation Systems': constructedObjects[key].ss
										}
										finalresult.totalConstuctedBarGraph.push(eachObject);
									}
									console.log('Modified Results: ', finalresult.totalConstuctedBarGraph);
									connection.query(
										`Select WStatus from WaterSources`,
										function (err, result) {
											if (err) {
												res.status(500).json({ message: err.toString() });
												return;
											}
											console.log('WaterSourceStatuses: ', result);
											let constructedObjects = {};
											for (let eachresult of result) {
												if(constructedObjects[eachresult.WStatus])
													constructedObjects[eachresult.WStatus] += 1
												else 
													constructedObjects[eachresult.WStatus] = 1
											}
											for(let key in constructedObjects) {
												let eachObject = {
													'name': key,
													'value': constructedObjects[key]
												}
												if(key === 'Planned') {
													eachObject.fill= '#75AFE9'
												}
												else if(key === 'Approved') {
													eachObject.fill= '#FFE338'
												}
												else if(key === 'Under-construction') {
													eachObject.fill= '#b5651d '
												}
												else if(key === 'Working') {
													eachObject.fill= '#28A428'
												}
												else if(key === 'Under-maintenance') {
													eachObject.fill= '#D61A3C'
												}							
												finalresult.waterSourcesStatusPieChart.push(eachObject);
												if(key === 'Working' || key === 'Under-maintainance') {
													finalresult.totalWaterSourcesConstructed += constructedObjects[key];
												}
											}
											console.log('WaterSourceStatus Data: ', finalresult.waterSourcesStatusPieChart);
											console.log('TotalWaterSourcesConstructed: ', finalresult.totalWaterSourcesConstructed);
											connection.query(
												`Select SStatus from SanitationSystems`,
												function (err, result) {
													if (err) {
														res.status(500).json({ message: err.toString() });
														return;
													}
													console.log('SanitationSystemsStatuses: ', result);
													let constructedObjects = {};
													for (let eachresult of result) {
														if(constructedObjects[eachresult.SStatus])
															constructedObjects[eachresult.SStatus] += 1
														else 
															constructedObjects[eachresult.SStatus] = 1
													}
													for(let key in constructedObjects) {
														let eachObject = {
															'name': key,
															'value': constructedObjects[key]
														}
														if(key === 'Planned') {
															eachObject.fill= '#75AFE9'
														}
														else if(key === 'Approved') {
															eachObject.fill= '#FFE338'
														}
														else if(key === 'Under-construction') {
															eachObject.fill= '#b5651d '
														}
														else if(key === 'Working') {
															eachObject.fill= '#28A428'
														}
														else if(key === 'Under-maintenance') {
															eachObject.fill= '#D61A3C'
														}											
														finalresult.sanitationSystemsStatusPieChart.push(eachObject);
														if(key === 'Working' || key === 'Under-maintainance') {
															finalresult.totalSanitationSystemsConstructed += constructedObjects[key];
														}
													}
													console.log('SanitaionSystemsStatus Data: ', finalresult.sanitationSystemsStatusPieChart);
													console.log('TotalSanitaionSystemsConstructed: ', finalresult.totalSanitationSystemsConstructed);
													res.status(200).json({
														message: "Statistics Fetched Successfully!",
														finalresult,
													});
												}
											);
										}
									);
								}
							);
						}
					);
				}
			);
		}
	);
});

module.exports = router;
