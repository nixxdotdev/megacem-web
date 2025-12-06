import React, { useState, useEffect } from "react";
import { getGMCH } from "../services/gmchServices";

const HolcimPage = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showBetween, setShowBetween] = useState(false);

    useEffect(() => {
        getGMCH({ setResponse, setError, setLoading });
    }, []);

    return (
        <>
            <div className="row align-items-center mb-3 justify-content-between">
                <div className="col-auto">
                    <h3 className="mb-0 font-weight-bold">GMC - HOLCIM</h3>
                </div>
                <div className="col-auto">
                    <button className="btn btn-success mr-2">Add New Data</button>
                    <button className="btn btn-warning text-white mr-2">Edit Data</button>
                    <button className="btn btn-primary mr-2">Extract Table</button>
                    <button className="btn btn-secondary">Settings</button>
                </div>
            </div>

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    {/* FILTER UI (unchanged) */}
                </div>

                <div className="card-body">
                    {loading && <p>Loading data...</p>}
                    {error && <p className="text-danger">{error}</p>}

                    {!loading && !error && (
                        <div className="table-responsive">
                            <table className="table table-bordered" width="100%">
                                <thead>
                                    <tr>
                                        <th className="text-center">No.</th>
                                        <th className="text-center">Delivery Source / Plant Site</th>
                                        <th className="text-center">Delivery Date</th>
                                        <th className="text-center">DR No.</th>
                                        <th className="text-center">Holcim Weigh Slip</th>
                                        <th className="text-center">P.O. Number</th>
                                        <th className="text-center">Rate</th>
                                        <th className="text-center">VAT</th>
                                        <th className="text-center">Gross Amount</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {response.length > 0 ? (
                                        response.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="text-center">{idx + 1}</td>
                                                <td className="text-center">{item.plantsite || "-"}</td>
                                                <td className="text-center">{item.drdate || "-"}</td>
                                                <td className="text-center">{item.drnumber || "-"}</td>
                                                <td className="text-center">{item.weighslip || "-"}</td>
                                                <td className="text-center">{item.ponumber || "-"}</td>
                                                <td className="text-center">{item.rate || "-"}</td>
                                                <td className="text-center">{item.vat || "-"}</td>
                                                <td className="text-center">{item.grossamount || "-"}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center">
                                                No data available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* FOOTER UI (unchanged) */}
        </>
    );
};

export default HolcimPage;
