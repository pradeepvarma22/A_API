import { model, models, Schema } from "mongoose"

const userSchema = new Schema({
    walletAddress: {
        type: String,
        required: true,
        unique: true 
    },
    isApiActive: Boolean,
    apiKey: String

});

export const User = models.User || model('User', userSchema) 