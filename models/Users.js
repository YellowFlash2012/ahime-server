import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema(
    {
    

        name: {
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
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// *****hashing the pw for the login route****
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// *****hashing the password for the register route***
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
        // this is to prevent submit a passwordless form
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
})

const Users = mongoose.model("Users", userSchema);

export default Users;
