import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [ true, "name not provided" ]
    },
    email: {
        type: String,
        unique: [ 
            true,
            "email already exists in database!"
        ],
        lowercase: true,
        trim: true,
        required: [
            true,
            "email not provided"
        ],
        validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: `{VALUE} is not a valid email`
        }
    },
    role: {
        type: String,
        enum: ["normal", "admin"],
        required: [true, "Please specify user role"]
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Users', userSchema);