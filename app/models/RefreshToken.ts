import mongoose, { InferSchemaType } from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});
type RefreshTokenType = InferSchemaType<typeof refreshTokenSchema>;
export default (mongoose.models.RefreshToken as mongoose.Model<RefreshTokenType>) ||
  mongoose.model<RefreshTokenType>("RefreshToken", refreshTokenSchema);
