const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: {type:String, required:true},
    content:{type:String, required:true},
    status: {type:Boolean, required:true},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"User_1", required:true}

},{
    versionKey : false,
    timestamps: true
})


const NoteModel = mongoose.model("Note", noteSchema);
module.exports = NoteModel;