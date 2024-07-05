"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const controllers_1 = require("../controllers");
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const UploadRoutes = (0, express_1.Router)();
const uploadController = new controllers_1.UploadController();
UploadRoutes.post('/upload', upload.single('file'), (req, res) => uploadController.uploadFile(req, res));
exports.default = UploadRoutes;
//# sourceMappingURL=uploadRoute.js.map