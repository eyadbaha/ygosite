import mongoose from "mongoose";
const Attributes = ["SPELL", "TRAP", "FIRE", "WATER", "EARTH", "WIND", "LIGHT", "DARK", "DIVINE", "LAUGH"] as const;
const CardSetSchema = new mongoose.Schema({
  code: String,
  rarity: String,
});

const CardSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    desc: String,
    attribute: { type: String, enum: Attributes }, // Enum validation for attribute
    types: { type: [String], validate: { validator: (types: string[]) => new Set(types).size === types.length, message: "Must be an array of unique types" } }, // Array validation for unique types
    official: Boolean,
    sets: [CardSetSchema],
    arts: [Number],
    atk: { type: Number, min: -1 },
    level: { type: Number, min: 1, max: 13 },
    def: { type: Number, min: -1 },
    scale: { type: Number, min: 0, max: 13 },
    pend_desc: String,
    linkmarkers: { type: [String], min: 1, max: 8 },
    legend: Boolean,
    maxAtk: { type: Number, min: -1 },
  },
  { collection: "cards" }
);
const modelName = "YugiohCard";
const existingModel = mongoose.models[modelName];

// Define Mongoose model if not already defined
const YugiohCardModel = existingModel || mongoose.model(modelName, CardSchema);

// Export the model
export default YugiohCardModel;
