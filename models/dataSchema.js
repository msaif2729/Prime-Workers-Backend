const mongoose = require('mongoose');
const {Schema} = mongoose;

const dataSchema =new Schema(
    {
        title:{
            type:String,
            required:true,
            unique:true
        },
        tagline:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        coverImage:{
            type:String,
            required:true
        },
        icon:{
            type:String,
            required:true
        },
        images:{
            type:[String],
            required:false
        },
    }
)

module.exports = mongoose.model("Category",dataSchema);