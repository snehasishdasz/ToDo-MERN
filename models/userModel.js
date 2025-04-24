const { mongoose, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


userSchema.pre("save", async function (next) {
    const user = this;

    // Only hash the password if it's modified or is a new user
    if (user.isModified("password")) {
        try {
            // Generate salt and hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw err;
    }
};

module.exports = mongoose.model("User", userSchema);
