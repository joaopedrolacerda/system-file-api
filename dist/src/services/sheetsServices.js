"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = __importDefault(require("xlsx"));
function readSheet({ fileBuffer }) {
    const workbook = xlsx_1.default.read(fileBuffer, { type: 'buffer' });
    const sheetNames = workbook.SheetNames;
    const results = sheetNames.map((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        return {
            sheetName,
            data: xlsx_1.default.utils.sheet_to_json(worksheet),
        };
    });
    //@ts-ignore
    return results;
}
exports.default = readSheet;
//# sourceMappingURL=sheetsServices.js.map