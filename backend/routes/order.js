const express = require("express");
const router = express.Router();
const { getAdminOrder, updateOrderStatus } = require("./../handlers/order-handler");

router.get("", async (req, res)=>{
    const orders = await getAdminOrder();
    res.send(orders);


})


router.post("/:id", async (req, res)=>{
    const id = req.params.id;
    const status = req.body.status;

   await updateOrderStatus(id,status);
    res.send({message:"Updated Successfully!"});


})

module.exports=router;