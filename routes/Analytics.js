const express = require("express");
const router = express.Router();
const connection = require("./../db");
const config = require("./../config");

router.get("/getallstatistics", (req, res, next) => {
	var alldistrictresult = null;
	var allpanchayatresult = null;
	var allfamilyresult = null;
	var allpersonresult = null;

	var allwsconstructedresult = null;
	var allwsplannedresult = null;
	var allwsundermaintenanceresult = null;
	var allwsplannedresult = null;
	var allwsworkingresult = null;
	var allwsunderconstructionresult = null;

	var allssconstructedresult = null;
	var allssplannedresult = null;
	var allssundermaintenanceresult = null;
	var allssplannedresult = null;
	var allssworkingresult = null;
	var allssunderconstructionresult = null;
	connection.query(
		`SELECT count(DISTINCT District ) from Locations`,
		function (err, districtresult) {
			if (err) {
				res.status(500).json({ message: err.toString() });
				return;
			}
			alldistrictresult = districtresult[0];
			connection.query(
				`SELECT count(DISTINCT Panchayat ) from Locations`,
				function (err, panchayatresult) {
					if (err) {
						res.status(500).json({ message: err.toString() });
						return;
					}
					allpanchayatresult = panchayatresult[0];
					connection.query(
						`SELECT count(FID) from Families`,
						function (err, familyresult) {
							if (err) {
								res.status(500).json({
									message: err.toString(),
								});
								return;
							}
							allfamilyresult = familyresult[0];
							connection.query(
								`SELECT sum(Persons) from Families`,
								function (err, personresult) {
									if (err) {
										res.status(500).json({
											message: err.toString(),
										});
										return;
									}
									allpersonresult = personresult[0];
									connection.query(
										`SELECT count(WSID) from WaterSources where WStatus='Under-maintenance' or WStatus='Working'`,
										function (err, wsconstructedresult) {
											if (err) {
												res.status(500).json({
													message: err.toString(),
												});
												return;
											}
											allwsconstructedresult =
												wsconstructedresult[0];
											connection.query(
												`SELECT count(WSID) from WaterSources where WStatus='Planned'`,
												function (
													err,
													wsplannedresult
												) {
													if (err) {
														res.status(500).json({
															message: err.toString(),
														});
														return;
													}
													allwsplannedresult =
														wsplannedresult[0];
													connection.query(
														`SELECT count(WSID) from WaterSources where WStatus='Under-maintenance'`,
														function (
															err,
															wsundermaintenanceresult
														) {
															if (err) {
																res.status(
																	500
																).json({
																	message: err.toString(),
																});
																return;
															}
															allwsundermaintenanceresult =
																wsundermaintenanceresult[0];
															connection.query(
																`SELECT count(WSID) from WaterSources where WStatus='Under-construction'`,
																function (
																	err,
																	wsundersconstructionresult
																) {
																	if (err) {
																		res.status(
																			500
																		).json({
																			message: err.toString(),
																		});
																		return;
																	}
																	allwsunderconstructionresult =
																		wsundermaintenanceresult[0];
																	connection.query(
																		`SELECT count(WSID) from WaterSources where WStatus='Working'`,
																		function (
																			err,
																			wsworkingresult
																		) {
																			if (
																				err
																			) {
																				res.status(
																					500
																				).json(
																					{
																						message: err.toString(),
																					}
																				);
																				return;
																			}
																			allwsworkingresult =
																				wsworkingresult[0];
																			connection.query(
																				`SELECT count(SSID) from SanitationSystems where SStatus='Under-maintenance' or SStatus='Working'`,
																				function (
																					err,
																					ssconstructedresult
																				) {
																					if (
																						err
																					) {
																						res.status(
																							500
																						).json(
																							{
																								message: err.toString(),
																							}
																						);
																						return;
																					}
																					allssconstructedresult =
																						ssconstructedresult[0];
																					connection.query(
																						`SELECT count(SSID) from SanitationSystems where SStatus='Planned'`,
																						function (
																							err,
																							ssplannedresult
																						) {
																							if (
																								err
																							) {
																								res.status(
																									500
																								).json(
																									{
																										message: err.toString(),
																									}
																								);
																								return;
																							}
																							allssplannedresult =
																								ssplannedresult[0];
																							connection.query(
																								`SELECT count(SSID) from SanitationSystems where SStatus='Under-maintenance'`,
																								function (
																									err,
																									ssundermaintenanceresult
																								) {
																									if (
																										err
																									) {
																										res.status(
																											500
																										).json(
																											{
																												message: err.toString(),
																											}
																										);
																										return;
																									}
																									allssundermaintenanceresult =
																										ssundermaintenanceresult[0];
																									connection.query(
																										`SELECT count(SSID) from SanitationSystems where SStatus='Under-construction'`,
																										function (
																											err,
																											ssunderconstructionresult
																										) {
																											if (
																												err
																											) {
																												res.status(
																													500
																												).json(
																													{
																														message: err.toString(),
																													}
																												);
																												return;
																											}
																											allssunderconstructionresult =
																												ssunderconstructionresult[0];
																											connection.query(
																												`SELECT count(SSID) from SanitationSystems where SStatus='Working'`,
																												function (
																													err,
																													ssworkingresult
																												) {
																													if (
																														err
																													) {
																														res.status(
																															500
																														).json(
																															{
																																message: err.toString(),
																															}
																														);
																														return;
																													}
																													allssworkingresult =
																														ssworkingresult[0];
																													var allstatistics = {
																														alldistrictresult,
																														allpanchayatresult,
																														allfamilyresult,
																														allpersonresult,
																														allwsconstructedresult,
																														allwsplannedresult,
																														allwsundermaintenanceresult,
																														allwsplannedresult,
																														allwsworkingresult,
																														allwsunderconstructionresult,
																														allssconstructedresult,
																														allssplannedresult,
																														allssundermaintenanceresult,
																														allssplannedresult,
																														allssworkingresult,
																														allssunderconstructionresult,
																													};

																													res.status(
																														200
																													).json(
																														{
																															message:
																																"Statistics Fetched Successfully!",
																															allstatistics,
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
