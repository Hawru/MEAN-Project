'use strict'

import { isValidObjectId } from "mongoose";
import projectModel from "../models/project.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

export const projectController = {
    getProject: async(req, res) => {
        let id = req.params.id;
        if(isValidObjectId(id)){
            try {
            
                let docs = await projectModel.findById(id);
                if (!docs) {
                    return res.status(200).json({"message": "Docs not found"});
                } else {
                    return res.status(200).json(docs);
                }
                    
                
            } catch (e) {
                return res.status(500).json({"message": "Error"});
            } 
            
        } else {
            return res.status(200).json({"message": "Docs not found"});
        }
        
    },

    getProjects: async(req, res) => {
        try {
            let docs = await projectModel.find().exec();
            if (!docs) {
                return res.status(404).json({"message": "Docs not found"});
            }
            return res.status(200).json(docs);
        } catch (e) {
            return res.status(500).json({"message": "Error"});
        } 
    },

    saveProject: async(req, res) => {
        let params = req.body;
        let projectObj = {
            name: params.name,
            description: params.description,
            category: params.category,
            year: params.year,
            langs: params.langs,
        };
        let project = new projectModel(projectObj);
        try{
            await project.save();
            if (!project) {
                return res.status(404).json({"message": "Docs not found"});
            }
            return res.status(200).json(project);

        } catch (e) {
            return res.status(500).json({"message": "Error"});
        }
    },

    deleteProject: async(req, res) => {
        let id = req.params.id;

        try{
            let deletedProject = await projectModel.findByIdAndDelete(id);
            if (!deletedProject) {
                return res.status(404).json({"message": "Can't delete"});
            } else {
                if(deletedProject.img) {
                    let imageUrl = deletedProject.img;
                    let pathFile = path.join(__dirname, '../../public/img/', imageUrl)
                    fs.unlink(pathFile, (e) => {}); 
                }
                return res.status(200).json(deletedProject); 
                

            }
            
        } catch (e) {
            return res.status(500).json({"message": "Error"});
        }
    },

    updateProject: async(req, res) => {
        let id = req.params.id;
        let update = req.body;
        try {
            let projectUpdated = await projectModel.findByIdAndUpdate(id, update, {new:true});
            if (!projectUpdated) {
                return res.status(404).json({"message": "Can't update"});
            }
            return res.status(200).json(projectUpdated);

        } catch (e) {
            return res.status(500).json({"message": "Error"});
        }
        
    },

    uploadImage: async(req, res) => {
        let id = req.params.id;
        if(req.file) {
            let filename = req.file.filename;         
            let ext = path.extname(filename);
            if(ext == '.png' || ext == '.jpg' || ext == '.jpeg') {
                try{
                    let project = await projectModel.findById(id);
                    if(project.img) {
                        let imageUrl = project.img;
                        let pathFile = path.join(__dirname, '../../public/img/', imageUrl)
                        fs.unlink(pathFile, (e) => {}); 
                    }
                    let projectImg = await projectModel.findByIdAndUpdate(id, {img: filename}, {new: true})
                    if (!projectImg) {
                        return res.status(404).json({"message": "Can't find the project"});
                    }
                
                    res.status(200).json({
                        files: req.file,
                        project: projectImg
                    })
                } catch (e) {
                    
                    return res.status(500).json({"message": "Error"});
                }
            } else {
                fs.unlink(req.file.path, (e) => {
                    return res.status(200).json({"message": "Img with an incorrect extension"})
                });
            }
        } else {
            return res.status(200).json({"message": "Error uploading image"})
        }
    },

    getImageFile: (req, res) => {
        let imageUrl = req.params.image;
        let pathFile = path.join(__dirname, '../../public/img/', imageUrl)
        
        if(fs.existsSync(pathFile)) {
            return res.sendFile(pathFile);
        } else{
            res.status(200).json({
                message: "No existe la imagen"
            });
        }
    }


}
