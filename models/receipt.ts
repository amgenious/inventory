import mongoose, { Schema, Document } from "mongoose";

export interface IReceipts extends Document {
  referencenumber: string;
  valuedate:string;
  invoicenumber: string;
  invoicedate:string;
  transtype:string;
  transcode:string;
  supplier:string;
  remarks:string;
  itemname:string;
  partnumber:string;
  location:string;
  quantity:number;
}

const ReceiptSchema: Schema = new Schema(
  {
    referencenumber: { type: String, required: true},
    valuedate: { type: String, required: true},
    invoicenumber: { type: String, required: true},
    invoicedate: { type: String, required: true},
    transtype: { type: String, required: true},
    transcode: { type: String, required: true},
    supplier: { type: String, required:true,},
    remarks: { type: String, required: true,},
    itemname: { type: String, required: true},
    partnumber: { type: String, required: true},
    location: { type: String, required: true},
    quantity: { type: Number, required: true},
  },
  { timestamps: true }
);

export default mongoose.models.Receipts || mongoose.model<IReceipts>("Receipts", ReceiptSchema);