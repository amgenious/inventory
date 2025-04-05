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
    category: { type: String, required: true, },
    location: { type: String, required:true,},
    measurement: { type: String, required: true,},
    partnumber: { type: String, required: true},
    min_stock: { type: Number, required: true},
    max_stock: { type: Number, required: true},
    quantity: { type: Number, required: true},
    price: { type: Number, required: true},
  },
  { timestamps: true }
);

export default mongoose.models.Stock || mongoose.model<IStock>("Stock", StockSchema);
