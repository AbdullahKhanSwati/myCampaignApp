import  Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({

name:{
    type:String,
    required:true,
    trim:true
},
email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
},
password:{
    type:String,
    required:true,
     trim:true
},
role: {
    type: Number,
    default: 0,
  },



},{timestamps: true,})

export default Mongoose.model('data',UserSchema);



