import mongoose from "mongoose";
export const FOOD_CATEGORIES = [
  "Pizza",
  "Burger",
  "Biryani",
  "Chinese",
  "Indian",
  "South Indian",
  "North Indian",
  "Fast Food",
  "Desserts",
  "Beverages",
  "Bakery",
  "Sandwiches",
  "Seafood",
  "Healthy Food",
  "Street Food",
];
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    category: {
      type: String,
      enum: FOOD_CATEGORIES,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    foodType: {
      type: String,
      enum: ["Veg", "Non Veg"],
    },
  },
  { timestamps: true },
);

const Item = mongoose.model("items", itemSchema);

export default Item;
