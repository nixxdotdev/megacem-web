import { find } from '../models/GMCHolcim';

export async function getData(req, res) {
  try {
    const data = await find().limit(10);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
