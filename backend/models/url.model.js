import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortId:{
        type:String,
        unique:true
    },
    qrCodeImg:{
        type:String,
        required:true
    },
    visitHistory:[{
        timestamps:{type:Number}
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
{ timestamps: true })

export const Url = mongoose.model("Url", urlSchema)