import React, { useState, useEffect } from "react";
import { getGMCH, addGMCH, updateGMCH, deleteGMCH } from "../services/gmchServices";
import { formatDateDMY } from "../helpers/formatDate";

const HolcimPage = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterBy, setFilterBy] = useState("");
    const [operator, setOperator] = useState("equal");



    // Modal State
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        MTIdr: "",
        drdate: "",
        drnumber: "",
        weighslip: "",
        ponumber: "",
        thnumber: "",
        trucktype: "",
    });

    useEffect(() => {
        getGMCH({ setResponse, setError, setLoading });
    }, []);

    // INPUT HANDLER
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // SAVE BUTTON IN MODAL
   const handleSave = () => {
        if (isEdit) {
            updateGMCH({
            id: selectedId,
            formData,
            setResponse,
            setError,
            setLoading
            });
        } else {
            addGMCH({
            formData,
            setResponse,
            setError,
            setLoading
            });
        }

        closeModal();
        setIsEdit(false);
    };


    const handleEdit = (item) => {
        setIsEdit(true);
        setSelectedId(item._id);
        setFormData({
            MTIdr: item.MTIdr,
            drdate: item.drdate,
            drnumber: item.drnumber,
            weighslip: item.weighslip,
            ponumber: item.ponumber,
            thnumber: item.thnumber,
            trucktype: item.trucktype
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setIsEdit(false);
        setSelectedId(null);
        setFormData({
            MTIdr: "MTI DR - 00090839",
            drdate: "",
            drnumber: "",
            weighslip: "",
            ponumber: "",
            thnumber: "",
            trucktype: "DUMPTRAILER",
        });
    };

    const handleFilter = () => {

    };

    const handleDelete = (item) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

        deleteGMCH({
            id: item._id,
            setResponse,
            setError,
            setLoading,
        });
    };


    return (
        <>
            <div className="row align-items-center mb-3 justify-content-between">
                <div className="col-auto">
                    <h3 className="mb-0 font-weight-bold">GMC - HOLCIM</h3>
                </div>        

                <div className="col-auto d-flex align-items-end">


                    <button
                        className="btn btn-outline-primary mr-2"
                        onClick={() => setShowFilterModal(true)}
                    >
                            Custom Filter
                    </button>


                    <button
                        className="btn btn-success mr-2"
                        onClick={() => {
                            setIsEdit(false);
                            setShowModal(true);
                        }}
                    >
                        Add New Data

                        
                        
                    </button>
                    <button className="btn btn-primary mr-2">Extract Table</button>
                    <button className="btn btn-secondary">Settings</button>
                </div>

                
            </div>

            {/* ===================== MODAL ===================== */}
            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Add/Update New Data</h5>
                                <button
                                    className="close"
                                    onClick={closeModal}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Delivery Date</label>
                                        <input
                                            type="date"
                                            name="drdate"
                                            className="form-control"
                                            value={formData.drdate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Delivery Receipt No.</label>
                                        <input
                                            type="text"
                                            name="drnumber"
                                            className="form-control"
                                            value={formData.drnumber}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mt-3">
                                        <label>Weigh Slip</label>
                                        <input
                                            type="text"
                                            name="weighslip"
                                            className="form-control"
                                            value={formData.weighslip}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <label>P.O. Number</label>
                                        <select
                                            name="ponumber"
                                            value={formData.ponumber}
                                            className="form-control"
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>Select P.O. Number</option>
                                            <option value="6700231416">6700231416</option>
                                            <option value="6700231417">6700231417</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <label>TH Number</label>
                                        <select
                                            name="thnumber"
                                            value={formData.thnumber}
                                            className="form-control"
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>Select TH Number</option>
                                            <option value="291">291</option>
                                            <option value="292">292</option>
                                            <option value="295">295</option>
                                            <option value="285">285</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <label>Truck Type</label>
                                        <select
                                            name="trucktype"
                                            value={formData.trucktype}
                                            className="form-control"
                                            onChange={handleChange}
                                        >
                                            <option value="DUMPTRAILER">DUMPTRAILER</option>
                                            <option value="DUMPTRUCK">DUMPTRUCK</option>
                                        </select>
                                    </div>
                                     <div className="col-md-6 mt-3">
                                        <label>MTI DR No.</label>
                                         <input
                                            type="text"
                                            name="MTIdr"
                                            className="form-control"
                                            value={formData.MTIdr}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>

                                <button className="btn btn-primary" onClick={handleSave}>
                                    Save
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {showFilterModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">

                            {/* HEADER */}
                            <div className="modal-header justify-content-center">
                                <h3 className="modal-title font-weight-bold text-center">
                                    CUSTOM FILTER
                                </h3>
                                <button
                                    type="button"
                                    className="close position-absolute"
                                    style={{ right: "15px" }}
                                    onClick={() => setShowFilterModal(false)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>

                            {/* BODY */}
                            <div className="modal-body">
                                <div className="d-flex justify-content-between align-items-end">

                                    {/* DROPDOWN 1*/}
                                    <div className="flex-fill mr-2">
                                        <label>Filter By</label>
                                       <select
                                            className="form-control"
                                            value={filterBy}
                                            onChange={(e) => setFilterBy(e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            <option value="drdate">Delivery Date</option>
                                            <option value="ponumber">P.O. Number</option>
                                            <option value="thnumber">TH Number</option>
                                            <option value="trucktype">Truck Type</option>
                                        </select>
                                    </div>

                                   {/* DROPDOWN 2 */}
                                    <div className="flex-fill mr-2">
                                        <select
                                            className="form-control"
                                            value={operator}
                                            onChange={(e) => setOperator(e.target.value)}
                                        >
                                            <option value="equal">equal to</option>
                                            <option value="contains">contains</option>
                                            <option value="not-contains">not contains</option>
                                            {filterBy === "drdate" ? (
                                                <option value="is-between">is between</option>
                                            ) : null}
                                        </select>
                                    </div>

                                    {/* INPUT 2 */}
                                    <div className="flex-fill">
                                        <label>Value</label>

                                        {/* DELIVERY DATE */}
                                        {filterBy === "drdate" ? (
                                            operator === "is-between" ? (
                                                
                                                <div className="d-flex">
                                                    <input
                                                        type="date"
                                                        className="form-control mr-2"
                                                        placeholder="Start Date"
                                                    />
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        placeholder="End Date"
                                                    />
                                                </div>
                                            ) : (
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                />
                                            )
                                        ) : (
                                            /* NON-DATE FILTERS */
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter value"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="modal-footer justify-content-center">
                                <button
                                    className="btn btn-secondary mr-2"
                                    onClick={() => setShowFilterModal(false)}
                                >
                                    Cancel
                                </button>
                                <button className="btn btn-primary">
                                    Apply Filter
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}


            {/* ======== TABLE ======== */}
            <div className="card shadow mb-4">
                <div className="card-body">
                    {loading && <p>Loading data...</p>}
                    {error && <p className="text-danger">{error}</p>}

                    {!loading && !error && (
                        <div className="table-responsive">
                            <table className="table table-bordered" width="100%">
                                <thead>
                                    <tr>
                                        <th className="text-center">No.</th>
                                        <th className="text-center">Delivery Date</th>
                                        <th className="text-center">DR No.</th>
                                        <th className="text-center">Holcim Weigh Slip</th>
                                        <th className="text-center">P.O. Number</th>
                                        <th className="text-center">TH Number</th>
                                        <th className="text-center">Truck Type</th>
                                        <th className="text-center">Rate</th>
                                        <th className="text-center">MTI DR No.</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {response.length > 0 ? (
                                        response.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="text-center">{idx + 1}</td>
                                                <td className="text-center">{formatDateDMY(item.drdate)}</td>
                                                <td className="text-center">{item.drnumber || "-"}</td>
                                                <td className="text-center">{item.weighslip || "-"}</td>
                                                <td className="text-center">{item.ponumber || "-"}</td>
                                                <td className="text-center">{item.thnumber || "-"}</td>
                                                <td className="text-center">{item.trucktype || "-"}</td>
                                                <td className="text-center">{item.rate + ".00" || "-"}</td>
                                                <td className="text-center">{item.MTIdr || "-"}</td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-sm btn-warning text-white mr-2"
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-danger text-white"
                                                        onClick={() => handleDelete(item)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>

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
        </>
    );
};

export default HolcimPage;
