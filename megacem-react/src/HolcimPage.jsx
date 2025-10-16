import React, { useState } from "react";

const HolcimPage = () => {
    const [showBetween, setShowBetween] = useState(false);

    return (
        <div className="container-fluid">

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
                    <div className="d-flex justify-content-even align-items-center flex-wrap" style={{ gap: "1rem" }}>
                        <div className="input-group" style={{ maxWidth: 300 }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                aria-label="Search"
                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                        {/* Filter Date and Time */}
                        <div className="d-flex align-items-center">
                            <select
                                className="form-control mr-2"
                                style={{ maxWidth: 180 }}
                                id="dateFilterType"
                                onChange={e => {
                                    const between = e.target.value === "between";
                                    setShowBetween(between);
                                }}
                            >
                                <option value="single">Equal to</option>
                                <option value="between">Between</option>
                            </select>
                            {showBetween ? (
                                <>
                                    <div className="d-flex align-items-center mr-2">
                                        <input
                                            type="date"
                                            className="form-control mr-2"
                                            style={{ maxWidth: 150 }}
                                        />
                                    </div>
                                    <span className="mx-2">to</span>
                                    <div className="d-flex align-items-center">
                                        <input
                                            type="date"
                                            className="form-control mr-2"
                                            style={{ maxWidth: 150 }}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="d-flex align-items-center">
                                    <input
                                        type="date"
                                        className="form-control mr-2"
                                        style={{ maxWidth: 150 }}
                                    />
                                </div>
                            )}
                        </div>
                        <select className="form-control" style={{ maxWidth: 200 }}>
                            <option value="">Sort by P.O. Number</option>
                            <option value="asc">630097432</option>
                            <option value="desc">630007256</option>
                        </select>
                        {/* Sort by Truck Type */}
                        <select className="form-control" style={{ maxWidth: 200 }}>
                            <option value="">Sort by Truck Type</option>
                            <option value="type1">DUMPTRAILER</option>
                            <option value="type2">DUMPTRUCK</option>
                        </select>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
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
                                <tr>
                                    <td>1.</td>
                                    <td className="text-center">GMC - HOLCIM BULACAN</td>
                                    <td className="text-center">2024-06-01</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">630097432</td>
                                    <td className="text-center">1,500.00</td>
                                    <td className="text-center">180.00</td>
                                    <td className="text-center">1,680.00</td>
                                </tr>
                                <tr>
                                    <td>1.</td>
                                    <td className="text-center">GMC - HOLCIM BULACAN</td>
                                    <td className="text-center">2024-06-01</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">630097432</td>
                                    <td className="text-center">1,500.00</td>
                                    <td className="text-center">180.00</td>
                                    <td className="text-center">1,680.00</td>
                                </tr>
                                <tr>
                                    <td>1.</td>
                                    <td className="text-center">GMC - HOLCIM BULACAN</td>
                                    <td className="text-center">2024-06-01</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">630097432</td>
                                    <td className="text-center">1,500.00</td>
                                    <td className="text-center">180.00</td>
                                    <td className="text-center">1,680.00</td>
                                </tr>
                                <tr>
                                    <td>1.</td>
                                    <td className="text-center">GMC - HOLCIM BULACAN</td>
                                    <td className="text-center">2024-06-01</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">630097432</td>
                                    <td className="text-center">1,500.00</td>
                                    <td className="text-center">180.00</td>
                                    <td className="text-center">1,680.00</td>
                                </tr>
                                <tr>
                                    <td>1.</td>
                                    <td className="text-center">GMC - HOLCIM BULACAN</td>
                                    <td className="text-center">2024-06-01</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">630097432</td>
                                    <td className="text-center">1,500.00</td>
                                    <td className="text-center">180.00</td>
                                    <td className="text-center">1,680.00</td>
                                </tr>
                                <tr>
                                    <td>1.</td>
                                    <td className="text-center">GMC - HOLCIM BULACAN</td>
                                    <td className="text-center">2024-06-01</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">630097432</td>
                                    <td className="text-center">1,500.00</td>
                                    <td className="text-center">180.00</td>
                                    <td className="text-center">1,680.00</td>
                                </tr>
                                <tr>
                                    <td>1.</td>
                                    <td className="text-center">GMC - HOLCIM BULACAN</td>
                                    <td className="text-center">2024-06-01</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">630097432</td>
                                    <td className="text-center">1,500.00</td>
                                    <td className="text-center">180.00</td>
                                    <td className="text-center">1,680.00</td>
                                </tr>
                                <tr>
                                    <td>1.</td>
                                    <td className="text-center">GMC - HOLCIM BULACAN</td>
                                    <td className="text-center">2024-06-01</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">0000000001</td>
                                    <td className="text-center">630097432</td>
                                    <td className="text-center">1,500.00</td>
                                    <td className="text-center">180.00</td>
                                    <td className="text-center">1,680.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="card-footer d-flex justify-content-around align-items-center" style={{ gap: "2rem" }}>
                <div>
                    <nav>
                        <ul className="pagination mb-0" style={{ gap: "0.5rem", display: "flex" }}>
                            <li className="page-item disabled">
                                <button className="page-link">Previous</button>
                            </li>
                            <li className="page-item active">
                                <button className="page-link">1</button>
                            </li>
                            <li className="page-item">
                                <button className="page-link">2</button>
                            </li>
                            <li className="page-item">
                                <button className="page-link">Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
                {/* Total Trips */}
                <div>
                    <span className="font-weight-bold">Total Trips: </span>
                    <span className="font-weight-bold">1</span>
                </div>
                {/* Total Amount */}
                <div>
                    <span className="font-weight-bold">Total Amount: </span>
                    <span className="font-weight-bold">₱1,680.00</span>
                </div>
            </div>
        </div>
    )
}

export default HolcimPage;

