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
    const rate = 3000;
    const vat = rate * 0.12;
    const grossamount = rate + vat;

    const newData = await GMCHolcim.create({
      ...req.body,
      rate,
      vat,
      grossamount,
    });

    res.status(201).json({
      success: true,
      message: "Data added successfully",
      data: newData,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}

export async function updateData(req, res) {
  try {
    const updated = await GMCHolcim.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function deleteData(req, res) {
  try {
    const deleted = await GMCHolcim.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.json({
      success: true,
      message: "Record deleted successfully",
      data: deleted,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}


