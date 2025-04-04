import mongoose, { Schema, Document } from "mongoose";

export interface IStock extends Document {
  name: string;
  category:string;
  location:string;
  measurement:string;
  partnumber:string;
  min_stock:number;
  max_stock:number;
  quantity:number;
  price:number;
}

const StockSchema: Schema = new Schema(
  {
    name: { type: String, required: true},
    category: { type: mongoose.Schema.Types.ObjectId,ref:'Category', required: true, index:true},
    location: { type: mongoose.Schema.Types.ObjectId, ref:'Location', required:true,index:true},
    measurement: { type: mongoose.Schema.Types.ObjectId,ref:'Measurement', required: true, index:true},
    partnumber: { type: String, required: true},
    min_stock: { type: Number, required: true},
    max_stock: { type: Number, required: true},
    quantity: { type: Number, required: true},
    price: { type: Number, required: true},
  },
  { timestamps: true }
);

export default mongoose.models.Stock || mongoose.model<IStock>("Stock", StockSchema);
