"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = groupValues;
const services_1 = require("../services");
function groupValues(data) {
    //@ts-ignore
    const groupedByOrderId = data.reduce((acc, order) => {
        const { userId, userName, orderId, productId, value, date } = order;
        if (!acc[userId]) {
            acc[userId] = {
                userName,
                userId,
                orders: []
            };
        }
        // @ts-ignore
        let existingOrder = acc[userId].orders.find(o => o.orderId === orderId);
        if (!existingOrder) {
            existingOrder = {
                orderId,
                products: [],
                totalValue: 0,
                date: (0, services_1.formatDateToDB)(date)
            };
            acc[userId].orders.push(existingOrder);
        }
        existingOrder.products.push({ productId, value });
        existingOrder.totalValue += value;
        return acc;
    }, {});
    return groupedByOrderId;
}
//# sourceMappingURL=groupValues.js.map