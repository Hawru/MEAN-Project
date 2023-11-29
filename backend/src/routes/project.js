'use strict'

import express from "express";
import { projectController } from "../controllers/project.js";
import  multer from "multer";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/img'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })

const router = express.Router();
router.get('/project', projectController.getProjects);
router.get('/project/:id', projectController.getProject);
router.post('/save-project', projectController.saveProject);
router.delete('/delete-project/:id', projectController.deleteProject);
router.put('/update-project/:id', projectController.updateProject);
router.post('/upload-image/:id', upload.single('img-project'), projectController.uploadImage);
router.get('/get-image/:image', projectController.getImageFile);

export default router;