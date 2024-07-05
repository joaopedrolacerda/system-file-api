"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const fs_1 = __importDefault(require("fs"));
const createServices_1 = require("../helpers/createServices");
const groupValues_1 = __importDefault(require("../helpers/groupValues"));
const services_1 = require("../services");
// import { SaveProcess } from '../services/saveProcess';
const startDatabase_1 = require("../startDatabase");
const repositories_1 = require("../repositories");
class UploadController {
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                res.status(400).send('No file uploaded.');
                return;
            }
            const filePath = req.file.path;
            const fileBuffer = fs_1.default.readFileSync(filePath);
            const jsonToConvert = (0, services_1.readSheet)({ fileBuffer });
            const groupedValues = (0, groupValues_1.default)(jsonToConvert[0].data);
            fs_1.default.unlinkSync(filePath);
            const saveProcess = new createServices_1.SaveProcess(startDatabase_1.AppDataSource, new repositories_1.UserRepository(), new repositories_1.OrderRepository(), new repositories_1.ProductRepository());
            yield saveProcess.saveUserData(groupedValues);
            res.json(groupedValues);
        });
    }
}
exports.UploadController = UploadController;
