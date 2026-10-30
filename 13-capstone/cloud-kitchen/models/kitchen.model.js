import mongoose from "mongoose";

const kitchenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    cuisine: [
      {
        type: String,
        trim: true,
      },
    ],
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    image: {
      public_id: { type: String, default: "" },
      url: { type: String, default: "" },
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    deliveryTime: {
      type: Number, // in minutes
      default: 30,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Kitchen = mongoose.model("Kitchen", kitchenSchema);
export default Kitchen;
