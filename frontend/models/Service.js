import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String },
});

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);