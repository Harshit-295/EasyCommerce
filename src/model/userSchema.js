import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    password:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
})

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
