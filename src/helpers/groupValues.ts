import { formatDateToDB } from "../services";

export default function groupValues(data:any){
 
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
        date: formatDateToDB(date)
      };
      acc[userId].orders.push(existingOrder);
    }
  
    existingOrder.products.push({ productId, value });
  
    existingOrder.totalValue += value;
  
    return acc;
  }, {});


return groupedByOrderId;
}

