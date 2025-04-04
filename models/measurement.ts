import mongoose, { Schema, Document } from "mongoose";

export interface IMeasurement extends Document {
  name: string;
}

const MeasurementSchema: Schema = new Schema(
  {
    name: { type: String, required: true},
  },
  { timestamps: true }
);

export default mongoose.models.Measurement || mongoose.model<IMeasurement>("Measurement", MeasurementSchema);
