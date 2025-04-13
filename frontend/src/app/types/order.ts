import { cartItem } from "./cartItem";

export interface Order{
    _id?:string,
    items: cartItem[],
    orderAddress:any,
    paymentType:string,
    date:Date,
    totalAmount:number,
    status?:string,
}