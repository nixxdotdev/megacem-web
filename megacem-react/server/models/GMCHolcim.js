import { Schema, model } from "mongoose";

const gmchSchema = new Schema({}, { strict: false });

export default model("GMCHolcim", gmchSchema);
