import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
  name: string;
  contact:string;
  email: string;
  address:string
}

const CustomerSchema: Schema = new Schema(
  {
    name: { type: String, required: true},
    contact: { type: String, required: true},
    email: { type: String,unique: true},
    address: { type: String, required: true},
  },
  { timestamps: true }
);

export default mongoose.models.Customer || mongoose.model<ICustomer>("Customer", CustomerSchema);
