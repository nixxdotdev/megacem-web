import GMCHolcim from '../models/GMCHolcim.js';

export async function getData(req, res) {
  try {
    const data = await GMCHolcim.find().limit(10);

    res.json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
}

export async function addData(req, res) {
  try {
    const {
      drdate,
      drnumber,
      weighslip,
      ponumber,
    } = req.body;

    const rate = 3000;

    const vat = rate * 0.12

    const grossamount = rate + vat;

    // Create document (without rate because you want to exclude it)
    const newData = new GMCHolcimModel({
      drdate,
      drnumber,
      weighslip,
      ponumber,
      rate,
      vat,
      grossamount,
      createdAt: new Date()
    });

    await newData.save();

    return res.status(201).json({
      success: true,
      message: "Data added successfully",
      data: newData
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}

