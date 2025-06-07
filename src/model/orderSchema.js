import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNo: {
      type: Number,
      required: true,
    },
    noOfProducts: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
