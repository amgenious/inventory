import mongoose, { Schema, Document } from "mongoose";

export interface ISupplier extends Document {
  name: string;
  contact:string;
  email: string;
  address:string
}

const SupplierSchema: Schema = new Schema(
  {
    name: { type: String, required: true},
    contact: { type: String, required: true},
    email: { type: String,unique: true},
    address: { type: String, required: true},
  },
  { timestamps: true }
);

export default mongoose.models.Supplier || mongoose.model<ISupplier>("Supplier", SupplierSchema);
