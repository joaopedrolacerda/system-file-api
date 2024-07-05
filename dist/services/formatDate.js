"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateToDB = formatDateToDB;
const date_fns_1 = require("date-fns");
function formatDateToDB(dateStr) {
    const date = (0, date_fns_1.parse)(dateStr, 'dd/MM/yyyy', new Date());
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
    }
    return (0, date_fns_1.format)(date, 'yyyy-MM-dd');
}
