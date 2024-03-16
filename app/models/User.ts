import mongoose, { InferSchemaType } from "mongoose";

const UserSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: String,
  roles: [String],
});
type UserType = InferSchemaType<typeof UserSchema>;
export default (mongoose.models.User as mongoose.Model<UserType>) || mongoose.model<UserType>("User", UserSchema);
