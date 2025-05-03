const { mongoose, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
