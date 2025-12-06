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

