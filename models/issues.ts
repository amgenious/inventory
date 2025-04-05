import mongoose, { Schema, Document } from "mongoose";

export interface IIssues extends Document {
  referencenumber: string;
  valuedate:string;
  transtype:string;
  transcode:string;
  customer:string;
  remarks:string;
  itemname:string;
  partnumber:string;
  location:string;
  quantity:number;
}

const IssuesSchema: Schema = new Schema(
  {
    referencenumber: { type: String, required: true},
    valuedate: { type: String, required: true},
    transtype: { type: String, required: true},
    transcode: { type: String, required: true},
    customer: { type: String, required:true,},
    remarks: { type: String, required: true,},
    itemname: { type: String, required: true},
    partnumber: { type: String, required: true},
    location: { type: String, required: true},
    quantity: { type: Number, required: true},
  },
  { timestamps: true }
);

export default mongoose.models.Issues || mongoose.model<IIssues>("Issues", IssuesSchema);
