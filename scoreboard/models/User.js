const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending Confirmation", "Active"],
      default: "Pending Confirmation",
    },
    password: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    firstNamee: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      enum: ["Shooting Guard", "Center", "Other"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
