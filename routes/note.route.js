const express = require("express");
const NoteModel = require("../model/note.model");

const noteRouter = express.Router();

noteRouter.get("/", async(req, res)=>{
    const userId = req.user._id
    console.log("user", req.user._id)
    console.log("user_1", req.user_1)
        try{
            const notes = await NoteModel.find({userId});
            res.status(201).json({message:"note fetched successfully", notes})
        }catch(err){
            res.status(401).json({message:"note fetching erro", err})

        }
})

noteRouter.post("/create", async(req, res) =>{

    console.log(req.body, req.user)
    const{title, content, status} = req.body;
    const userId = req.user._id;

   
    try{
        const note = new NoteModel({
            title,
            content,
            status,
            userId
        });
        await note.save();
        res.status(201).json({message:"Note createad successfully"})
    }catch(err){
        res.status(500).json({message:"error while creating note",err});
    }

})

noteRouter.patch("/update/:id", async(req,res) =>{
    const payload = req.body;
    const noteId = req.params.id;
    const userId = req.user._id;
    try{
        const note = await NoteModel.findOne({_id:noteId})
        if(note.userId.toString() == userId.toString()){
            await NoteModel.findByIdAndUpdate({_id:noteId}, payload)
            return res.status(201).json({message:"note updatead successfully"})

        }else {
            return res.status(401).json({message:"Unauthorized"})
        }
    }catch (err){
        res.status(401).json({message:"err occure on updation"})
    }
})

noteRouter.delete("/delete/:id", async(req, res) =>{
    const noteId = req.params.id;
    const userId = req.user._id;
    try{
        const note = await NoteModel.findOne({_id:noteId})
        if(note.userId.toString() == userId.toString()){
            await NoteModel.findByIdAndDelete({_id:noteId})
            return res.status(201).json({message:"note deleted successfully"})

        }else {
            return res.status(401).json({message:"Unauthorized"})
        }
    }catch (err){
        res.status(401).json({message:"err occured on deletion"})
    }
})

module.exports = noteRouter;