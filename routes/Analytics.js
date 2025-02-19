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
		averageWaterUsagePerPersonPerMonth: 0,
		averageWaterUsagePerMonth: 0,
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
			console.log("Locations: ", result);
			finalresult.totalDistictsCovered = result[0].districtcount;
			finalresult.totalPanchayatsCovered = result[0].panchayatcount;
			connection.query(
				`Select count(FID) as familycount, sum(Persons) as peoplecount from Families`,
				function (err, result) {
					if (err) {
						res.status(500).json({ message: err.toString() });
						return;
					}
					console.log("Families: ", result);
					finalresult.totalFamiliesBenefitted = result[0].familycount;
					finalresult.totalPeopleBenefitted = result[0].peoplecount;
					connection.query(
						`Select sum(Amount) as totaldonations, sum(EAmount) as totalexpenditure from Donations, Expenditures`,
						function (err, result) {
							if (err) {
								res.status(500).json({
									message: err.toString(),
								});
								return;
							}
							console.log("Donations: ", result);
							finalresult.totalDonations =
								result[0].totaldonations;
							finalresult.totalExpenditure =
								result[0].totalexpenditure;
							connection.query(
								`SELECT EDate, WSID, SSID from Expenditures`,
								function (err, result) {
									if (err) {
										res.status(500).json({
											message: err.toString(),
										});
										return;
									}
									console.log(
										"constructedProjects: ",
										result
									);
									let constructedObjects = {};
									for (let eachresult of result) {
										let year = eachresult.EDate.split(
											"-"
										)[2];
										if (constructedObjects[year]) {
											if (eachresult.WSID)
												constructedObjects[
													year
												].ws += 1;
											else
												constructedObjects[
													year
												].ss += 1;
										} else {
											if (eachresult.WSID)
												constructedObjects[year] = {
													ws: 1,
													ss: 0,
												};
											else
												constructedObjects[year] = {
													ss: 1,
													ws: 0,
												};
										}
									}
									for (let key in constructedObjects) {
										let eachObject = {
											name: key.toString(),
											"Water Sources":
												constructedObjects[key].ws,
											"Sanitation Systems":
												constructedObjects[key].ss,
										};
										finalresult.totalConstuctedBarGraph.push(
											eachObject
										);
									}
									console.log(
										"Modified Results: ",
										finalresult.totalConstuctedBarGraph
									);
									connection.query(
										`Select WStatus from WaterSources`,
										function (err, result) {
											if (err) {
												res.status(500).json({
													message: err.toString(),
												});
												return;
											}
											console.log(
												"WaterSourceStatuses: ",
												result
											);
											let constructedObjects = {};
											for (let eachresult of result) {
												if (
													constructedObjects[
														eachresult.WStatus
													]
												)
													constructedObjects[
														eachresult.WStatus
													] += 1;
												else
													constructedObjects[
														eachresult.WStatus
													] = 1;
											}
											for (let key in constructedObjects) {
												let eachObject = {
													name: key,
													value:
														constructedObjects[key],
												};
												if (key === "Planned") {
													eachObject.fill = "#75AFE9";
												} else if (key === "Approved") {
													eachObject.fill = "#FFE338";
												} else if (
													key === "Under-construction"
												) {
													eachObject.fill =
														"#b5651d ";
												} else if (key === "Working") {
													eachObject.fill = "#28A428";
												} else if (
													key === "Under-maintenance"
												) {
													eachObject.fill = "#D61A3C";
												}
												finalresult.waterSourcesStatusPieChart.push(
													eachObject
												);
												if (
													key === "Working" ||
													key === "Under-maintenance"
												) {
													finalresult.totalWaterSourcesConstructed +=
														constructedObjects[key];
												}
											}
											console.log(
												"WaterSourceStatus Data: ",
												finalresult.waterSourcesStatusPieChart
											);
											console.log(
												"TotalWaterSourcesConstructed: ",
												finalresult.totalWaterSourcesConstructed
											);
											connection.query(
												`Select SStatus from SanitationSystems`,
												function (err, result) {
													if (err) {
														res.status(500).json({
															message: err.toString(),
														});
														return;
													}
													console.log(
														"SanitationSystemsStatuses: ",
														result
													);
													let constructedObjects = {};
													for (let eachresult of result) {
														if (
															constructedObjects[
																eachresult
																	.SStatus
															]
														)
															constructedObjects[
																eachresult.SStatus
															] += 1;
														else
															constructedObjects[
																eachresult.SStatus
															] = 1;
													}
													for (let key in constructedObjects) {
														let eachObject = {
															name: key,
															value:
																constructedObjects[
																	key
																],
														};
														if (key === "Planned") {
															eachObject.fill =
																"#75AFE9";
														} else if (
															key === "Approved"
														) {
															eachObject.fill =
																"#FFE338";
														} else if (
															key ===
															"Under-construction"
														) {
															eachObject.fill =
																"#b5651d ";
														} else if (
															key === "Working"
														) {
															eachObject.fill =
																"#28A428";
														} else if (
															key ===
															"Under-maintenance"
														) {
															eachObject.fill =
																"#D61A3C";
														}
														finalresult.sanitationSystemsStatusPieChart.push(
															eachObject
														);
														if (
															key === "Working" ||
															key ===
																"Under-maintenance"
														) {
															finalresult.totalSanitationSystemsConstructed +=
																constructedObjects[
																	key
																];
														}
													}
													console.log(
														"SanitaionSystemsStatus Data: ",
														finalresult.sanitationSystemsStatusPieChart
													);
													console.log(
														"TotalSanitaionSystemsConstructed: ",
														finalresult.totalSanitationSystemsConstructed
													);
													connection.query(
														`Select avg(u.Usages) as averageusagepermonth from WaterUsages u join WaterSources w on w.WSID = u.WSID`,
														function (err, result) {
															if (err) {
																res.status(
																	500
																).json({
																	message: res.toString(),
																});
															}
															finalresult.averageWaterUsagePerMonth =
																result[0].averageusagepermonth;
															finalresult.averageWaterUsagePerPersonPerMonth =
																finalresult.averageWaterUsagePerMonth /
																finalresult.totalPeopleBenefitted;
															res.status(
																200
															).json({
																message:
																	"Statistics Fetched Successfully!",
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
		}
	);
});

router.post("/getpanchayatstatistics", (req, res, next) => {
	let finalresult = {
		totalFamiliesBenefitted: 0,
		totalPeopleBenefitted: 0,
		totalExpenditure: 0,
		totalWaterSourcesConstructed: 0,
		totalSanitationSystemsConstructed: 0,
		averageWaterUsagePerMonth: 0,
		averageWaterUsagePerPersonPerMonth: 0,
		totalConstuctedBarGraph: [],
		waterSourcesStatusPieChart: [],
		sanitationSystemsStatusPieChart: [],
	};

	connection.query(
		`Select count(FID) as familycount, sum(Persons) as peoplecount from Families where Pincode = ${req.body.Pincode}`,
		function (err, result) {
			if (err) {
				res.status(500).json({ message: err.toString() });
				return;
			}
			console.log("Families: ", result);
			finalresult.totalFamiliesBenefitted = result[0].familycount;
			finalresult.totalPeopleBenefitted = result[0].peoplecount === null ? 0 : result[0].peoplecount;
			connection.query(
				`Select sum(e.EAmount) as totalwsexpenditure from Expenditures e join WaterSources w on e.WSID = w.WSID where w.Pincode = ${req.body.Pincode}`,
				function (err, result) {
					if (err) {
						res.status(500).json({ message: err.toString() });
						return;
					}
					console.log("WS Expenditures: ", result);
					finalresult.totalExpenditure +=
						result[0].totalwsexpenditure;
					connection.query(
						`Select sum(e.EAmount) as totalssexpenditure from Expenditures e join SanitationSystems s on e.SSID = s.SSID where s.Pincode = ${req.body.Pincode}`,
						function (err, result) {
							if (err) {
								res.status(500).json({
									message: err.toString(),
								});
								return;
							}
							console.log("SS Expenditures: ", result);
							finalresult.totalExpenditure +=
								result[0].totalssexpenditure;
							connection.query(
								`SELECT e.EDate, e.WSID from Expenditures e join WaterSources w on e.wsid = w.wsid where w.Pincode = ${req.body.Pincode}`,
								function (err, result) {
									if (err) {
										res.status(500).json({
											message: err.toString(),
										});
										return;
									}
									console.log("EDate,WSID", result);
									let constructedObjects = {};
									for (let eachresult of result) {
										let year = eachresult.EDate.split(
											"-"
										)[2];
										if (constructedObjects[year]) {
											constructedObjects[year].ws += 1;
										} else {
											constructedObjects[year] = {
												ws: 1,
												ss: 0,
											};
										}
									}
									connection.query(
										`SELECT e.EDate, e.SSID from Expenditures e join SanitationSystems s on e.ssid = s.ssid where s.Pincode = ${req.body.Pincode}`,
										function (err, result) {
											if (err) {
												res.status(500).json({
													message: err.toString(),
												});
												return;
											}
											console.log("EDate,SSID", result);
											for (let eachresult of result) {
												let year = eachresult.EDate.split(
													"-"
												)[2];
												if (constructedObjects[year]) {
													constructedObjects[
														year
													].ss += 1;
												} else {
													constructedObjects[year] = {
														ws: 0,
														ss: 1,
													};
												}
											}
											for (let key in constructedObjects) {
												let eachObject = {
													name: key.toString(),
													"Water Sources":
														constructedObjects[key]
															.ws,
													"Sanitation Systems":
														constructedObjects[key]
															.ss,
												};
												finalresult.totalConstuctedBarGraph.push(
													eachObject
												);
											}
											console.log(
												"Modified Results: ",
												finalresult.totalConstuctedBarGraph
											);
											connection.query(
												`Select WStatus from WaterSources where Pincode = ${req.body.Pincode}`,
												function (err, result) {
													if (err) {
														res.status(500).json({
															message: err.toString(),
														});
														return;
													}
													console.log(
														"WaterSourceStatuses: ",
														result
													);
													let constructedObjects = {};
													for (let eachresult of result) {
														if (
															constructedObjects[
																eachresult
																	.WStatus
															]
														)
															constructedObjects[
																eachresult.WStatus
															] += 1;
														else
															constructedObjects[
																eachresult.WStatus
															] = 1;
													}
													for (let key in constructedObjects) {
														let eachObject = {
															name: key,
															value:
																constructedObjects[
																	key
																],
														};
														if (key === "Planned") {
															eachObject.fill =
																"#75AFE9";
														} else if (
															key === "Approved"
														) {
															eachObject.fill =
																"#FFE338";
														} else if (
															key ===
															"Under-construction"
														) {
															eachObject.fill =
																"#b5651d ";
														} else if (
															key === "Working"
														) {
															eachObject.fill =
																"#28A428";
														} else if (
															key ===
															"Under-maintenance"
														) {
															eachObject.fill =
																"#D61A3C";
														}
														finalresult.waterSourcesStatusPieChart.push(
															eachObject
														);
														if (
															key === "Working" ||
															key ===
																"Under-maintenance"
														) {
															finalresult.totalWaterSourcesConstructed +=
																constructedObjects[
																	key
																];
														}
													}
													console.log(
														"WaterSourceStatus Data: ",
														finalresult.waterSourcesStatusPieChart
													);
													console.log(
														"TotalWaterSourcesConstructed: ",
														finalresult.totalWaterSourcesConstructed
													);
													connection.query(
														`Select SStatus from SanitationSystems where Pincode = ${req.body.Pincode}`,
														function (err, result) {
															if (err) {
																res.status(
																	500
																).json({
																	message: err.toString(),
																});
																return;
															}
															console.log(
																"SanitationSystemsStatuses: ",
																result
															);
															let constructedObjects = {};
															for (let eachresult of result) {
																if (
																	constructedObjects[
																		eachresult
																			.SStatus
																	]
																)
																	constructedObjects[
																		eachresult.SStatus
																	] += 1;
																else
																	constructedObjects[
																		eachresult.SStatus
																	] = 1;
															}
															for (let key in constructedObjects) {
																let eachObject = {
																	name: key,
																	value:
																		constructedObjects[
																			key
																		],
																};
																if (
																	key ===
																	"Planned"
																) {
																	eachObject.fill =
																		"#75AFE9";
																} else if (
																	key ===
																	"Approved"
																) {
																	eachObject.fill =
																		"#FFE338";
																} else if (
																	key ===
																	"Under-construction"
																) {
																	eachObject.fill =
																		"#b5651d ";
																} else if (
																	key ===
																	"Working"
																) {
																	eachObject.fill =
																		"#28A428";
																} else if (
																	key ===
																	"Under-maintenance"
																) {
																	eachObject.fill =
																		"#D61A3C";
																}
																finalresult.sanitationSystemsStatusPieChart.push(
																	eachObject
																);
																if (
																	key ===
																		"Working" ||
																	key ===
																		"Under-maintenance"
																) {
																	finalresult.totalSanitationSystemsConstructed +=
																		constructedObjects[
																			key
																		];
																}
															}
															console.log(
																"SanitaionSystemsStatus Data: ",
																finalresult.sanitationSystemsStatusPieChart
															);
															console.log(
																"TotalSanitaionSystemsConstructed: ",
																finalresult.totalSanitationSystemsConstructed
															);
															connection.query(
																`Select avg(u.Usages) as averageusagepermonth from WaterUsages u join WaterSources w on w.WSID = u.WSID where w.Pincode = ${req.body.Pincode}`,
																function (
																	err,
																	result
																) {
																	if (err) {
																		res.status(
																			500
																		).json({
																			message: res.toString(),
																		});
																	}
																	console.log(
																		"Average Usage Per Month",
																		result[0]
																	);
																	finalresult.averageWaterUsagePerMonth =
																		result[0]
																			.averageusagepermonth ===
																		null
																			? 0
																			: result[0]
																					.averageusagepermonth;
																	if (
																		finalresult.averageWaterUsagePerMonth !==
																			0 &&
																		finalresult.totalPeopleBenefitted !==
																			0
																	)
																		finalresult.averageWaterUsagePerPersonPerMonth =
																			finalresult.averageWaterUsagePerMonth /
																			finalresult.totalPeopleBenefitted;
																	res.status(
																		200
																	).json({
																		message:
																			"Statistics Fetched Successfully!",
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
				}
			);
		}
	);
});

router.post("/getdistrictstatistics", (req, res, next) => {
	let finalresult = {
		totalPanchayatsCovered: 0,
		totalFamiliesBenefitted: 0,
		totalPeopleBenefitted: 0,
		totalExpenditure: 0,
		totalWaterSourcesConstructed: 0,
		totalSanitationSystemsConstructed: 0,
		averageWaterUsagePerMonth: 0,
		averageWaterUsagePerPersonPerMonth: 0,
		totalConstuctedBarGraph: [],
		waterSourcesStatusPieChart: [],
		sanitationSystemsStatusPieChart: [],
	};
	console.log(req.body.District);
	connection.query(
		`SELECT count(FID) as familycount, sum(Persons) as peoplecount FROM Families
		WHERE Pincode = ANY (SELECT Pincode FROM Locations
							 WHERE Locations.Pincode = Families.Pincode and Locations.District = '${req.body.District}')`,
		function (err, result) {
			if (err) {
				console.log(err);
				res.status(500).json({ message: err.toString() });
				return;
			}
			console.log("Families: ", result);
			finalresult.totalFamiliesBenefitted = result[0].familycount;
			finalresult.totalPeopleBenefitted =
				result[0].peoplecount === null ? 0 : result[0].peoplecount;
			connection.query(
				`Select sum(e.EAmount) as totalwsexpenditure from Expenditures e join WaterSources w on e.WSID = w.WSID where w.Pincode = ANY (SELECT Pincode FROM Locations
					WHERE Locations.Pincode = w.Pincode and Locations.District = '${req.body.District}')`,
				function (err, result) {
					if (err) {
						res.status(500).json({ message: err.toString() });
						return;
					}
					console.log("WS Expenditures: ", result);
					finalresult.totalExpenditure +=
						result[0].totalwsexpenditure;
					connection.query(
						`Select sum(e.EAmount) as totalssexpenditure from Expenditures e join SanitationSystems s on e.SSID = s.SSID where s.Pincode = ANY (SELECT Pincode FROM Locations
						WHERE Locations.Pincode = s.Pincode and Locations.District = '${req.body.District}')`,
						function (err, result) {
							if (err) {
								res.status(200).json({
									message: err.toString(),
								});
							}
							finalresult.totalExpenditure +=
								result[0].totalssexpenditure;
							connection.query(
								`SELECT e.EDate, e.WSID from Expenditures e join WaterSources w on e.wsid = w.wsid where w.Pincode = ANY (SELECT Pincode FROM Locations
								WHERE Locations.Pincode = w.Pincode and Locations.District = '${req.body.District}')`,
								function (err, result) {
									if (err) {
										res.status(500).json({
											message: err.toString(),
										});
										return;
									}
									console.log("EDate,WSID", result);
									let constructedObjects = {};
									for (let eachresult of result) {
										let year = eachresult.EDate.split(
											"-"
										)[2];
										if (constructedObjects[year]) {
											constructedObjects[year].ws += 1;
										} else {
											constructedObjects[year] = {
												ws: 1,
												ss: 0,
											};
										}
									}
									connection.query(
										`SELECT e.EDate, e.SSID from Expenditures e join SanitationSystems s on e.ssid = s.ssid where s.Pincode = ANY (SELECT Pincode FROM Locations
										WHERE Locations.Pincode = s.Pincode and Locations.District = '${req.body.District}')`,
										function (err, result) {
											if (err) {
												res.status(500).json({
													message: err.toString(),
												});
												return;
											}
											console.log("EDate,SSID", result);
											for (let eachresult of result) {
												let year = eachresult.EDate.split(
													"-"
												)[2];
												if (constructedObjects[year]) {
													constructedObjects[
														year
													].ss += 1;
												} else {
													constructedObjects[year] = {
														ws: 0,
														ss: 1,
													};
												}
											}
											for (let key in constructedObjects) {
												let eachObject = {
													name: key.toString(),
													"Water Sources":
														constructedObjects[key]
															.ws,
													"Sanitation Systems":
														constructedObjects[key]
															.ss,
												};
												finalresult.totalConstuctedBarGraph.push(
													eachObject
												);
											}
											console.log(
												"Modified Results: ",
												finalresult.totalConstuctedBarGraph
											);
											connection.query(
												`Select w.WStatus from WaterSources w where w.Pincode = ANY (SELECT Pincode FROM Locations
												WHERE Locations.Pincode = w.Pincode and Locations.District = '${req.body.District}')`,
												function (err, result) {
													if (err) {
														res.status(500).json({
															message: err.toString(),
														});
														return;
													}
													console.log(
														"WaterSourceStatuses: ",
														result
													);
													let constructedObjects = {};
													for (let eachresult of result) {
														if (
															constructedObjects[
																eachresult
																	.WStatus
															]
														)
															constructedObjects[
																eachresult.WStatus
															] += 1;
														else
															constructedObjects[
																eachresult.WStatus
															] = 1;
													}
													for (let key in constructedObjects) {
														let eachObject = {
															name: key,
															value:
																constructedObjects[
																	key
																],
														};
														if (key === "Planned") {
															eachObject.fill =
																"#75AFE9";
														} else if (
															key === "Approved"
														) {
															eachObject.fill =
																"#FFE338";
														} else if (
															key ===
															"Under-construction"
														) {
															eachObject.fill =
																"#b5651d ";
														} else if (
															key === "Working"
														) {
															eachObject.fill =
																"#28A428";
														} else if (
															key ===
															"Under-maintenance"
														) {
															eachObject.fill =
																"#D61A3C";
														}
														finalresult.waterSourcesStatusPieChart.push(
															eachObject
														);
														if (
															key === "Working" ||
															key ===
																"Under-maintenance"
														) {
															finalresult.totalWaterSourcesConstructed +=
																constructedObjects[
																	key
																];
														}
													}
													console.log(
														"WaterSourceStatus Data: ",
														finalresult.waterSourcesStatusPieChart
													);
													console.log(
														"TotalWaterSourcesConstructed: ",
														finalresult.totalWaterSourcesConstructed
													);
													connection.query(
														`Select s.SStatus from SanitationSystems s where Pincode = ANY (SELECT Pincode FROM Locations
														WHERE Locations.Pincode = s.Pincode and Locations.District = '${req.body.District}')`,
														function (err, result) {
															if (err) {
																res.status(
																	500
																).json({
																	message: err.toString(),
																});
																return;
															}
															console.log(
																"SanitationSystemsStatuses: ",
																result
															);
															let constructedObjects = {};
															for (let eachresult of result) {
																if (
																	constructedObjects[
																		eachresult
																			.SStatus
																	]
																)
																	constructedObjects[
																		eachresult.SStatus
																	] += 1;
																else
																	constructedObjects[
																		eachresult.SStatus
																	] = 1;
															}
															for (let key in constructedObjects) {
																let eachObject = {
																	name: key,
																	value:
																		constructedObjects[
																			key
																		],
																};
																if (
																	key ===
																	"Planned"
																) {
																	eachObject.fill =
																		"#75AFE9";
																} else if (
																	key ===
																	"Approved"
																) {
																	eachObject.fill =
																		"#FFE338";
																} else if (
																	key ===
																	"Under-construction"
																) {
																	eachObject.fill =
																		"#b5651d ";
																} else if (
																	key ===
																	"Working"
																) {
																	eachObject.fill =
																		"#28A428";
																} else if (
																	key ===
																	"Under-maintenance"
																) {
																	eachObject.fill =
																		"#D61A3C";
																}
																finalresult.sanitationSystemsStatusPieChart.push(
																	eachObject
																);
																if (
																	key ===
																		"Working" ||
																	key ===
																		"Under-maintenance"
																) {
																	finalresult.totalSanitationSystemsConstructed +=
																		constructedObjects[
																			key
																		];
																}
															}
															console.log(
																"SanitaionSystemsStatus Data: ",
																finalresult.sanitationSystemsStatusPieChart
															);
															console.log(
																"TotalSanitaionSystemsConstructed: ",
																finalresult.totalSanitationSystemsConstructed
															);
															connection.query(
																`select count(Panchayat) as panchayatcount from Locations where District = '${req.body.District}'`,
																function (
																	err,
																	result
																) {
																	if (err) {
																		res.status(
																			500
																		).json({
																			message: res.toString(),
																		});
																	}
																	finalresult.totalPanchayatsCovered =
																		result[0].panchayatcount;
																	connection.query(
																		`Select avg(u.Usages) as averageusagepermonth from WaterUsages u join WaterSources w on w.WSID = u.WSID where w.Pincode = ANY (SELECT Pincode FROM Locations
																	WHERE Locations.Pincode = w.Pincode and Locations.District = '${req.body.District}')`,
																		function (
																			err,
																			result
																		) {
																			if (
																				err
																			) {
																				res.status(
																					500
																				).json(
																					{
																						message: res.toString(),
																					}
																				);
																			}
																			console.log(
																				"Average Usage Per Month",
																				result[0]
																			);
																			finalresult.averageWaterUsagePerMonth =
																				result[0]
																					.averageusagepermonth ===
																				null
																					? 0
																					: result[0]
																							.averageusagepermonth;
																			if (
																				finalresult.averageWaterUsagePerMonth !==
																					0 &&
																				finalresult.totalPeopleBenefitted !==
																					0
																			)
																				finalresult.averageWaterUsagePerPersonPerMonth =
																					finalresult.averageWaterUsagePerMonth /
																					finalresult.totalPeopleBenefitted;
																			res.status(
																				200
																			).json(
																				{
																					message:
																						"Statistics Fetched Successfully!",
																					finalresult,
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
