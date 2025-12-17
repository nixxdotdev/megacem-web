import React, { useState, useEffect } from "react";
import { getGMCH, addGMCH, updateGMCH } from "../services/gmchServices";

const HolcimPage = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);


    // Modal State
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        MTIdr: "MTI DR - 00090839",
        drdate: "",
        drnumber: "",
        weighslip: "",
        ponumber: "",
        thnumber: "",
        trucktype: "DUMPTRAILER",
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
        setSelectedId(item._id); // MongoDB _id
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


    return (
        <>
            <div className="row align-items-center mb-3 justify-content-between">
                <div className="col-auto">
                    <h3 className="mb-0 font-weight-bold">GMC - HOLCIM</h3>
                </div>

                <div className="col-auto">
                    <button
                        className="btn btn-success mr-2"
                        onClick={() => {
                            setIsEdit(false);
                            setShowModal(true);
                        }}
                    >
                        Add New Data
                    </button>

                    <button className="btn btn-warning text-white mr-2">Edit Data</button>
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
                                <h5 className="modal-title">Add New Data</h5>
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
                                        <input
                                            type="text"
                                            name="ponumber"
                                            className="form-control"
                                            value={formData.ponumber}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mt-3">
                                        <label>TH Number</label>
                                        <input
                                            type="text"
                                            name="thnumber"
                                            value={formData.thnumber}
                                            className="form-control"
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
                                        <th className="text-center">Rate</th>
                                        <th className="text-center">VAT (12%)</th>
                                        <th className="text-center">Gross Amount</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {response.length > 0 ? (
                                        response.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="text-center">{idx + 1}</td>
                                                <td className="text-center">{item.drdate || "-"}</td>
                                                <td className="text-center">{item.drnumber || "-"}</td>
                                                <td className="text-center">{item.weighslip || "-"}</td>
                                                <td className="text-center">{item.ponumber || "-"}</td>
                                                <td className="text-center">{item.thnumber || "-"}</td>
                                                <td className="text-center">{item.rate + ".00" || "-"}</td>
                                                <td className="text-center">{item.vat + ".00" || "-"}</td>
                                                <td className="text-center">{item.grossamount + ".00" || "-"}</td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-sm btn-warning text-white"
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        Edit
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
