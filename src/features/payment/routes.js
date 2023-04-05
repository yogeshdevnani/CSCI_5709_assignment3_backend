const authenticateUser = require("../../utils/authenticateUser");
const express = require("express");
const { createAddress, createOrder, validatePayment} = require("./paymentcontroller");
const router = express.Router();


router.post("/saveaddress", authenticateUser, async(req,res)=>{
    try{
        const data=req.body;
        const userId = req.user.id;
        const response= await createAddress(data,userId);
        res.send(response)
    }
    catch(error){
        res.json({
            status:"Failed",
            message:error.message})

    }
})

router.post("/transaction", authenticateUser, async(req,res)=>{
    try {
        const data= req.body;
        const userId = req.user.id;
        console.log(userId)
        const paymentResponse= await validatePayment(data,userId)
        console.log(paymentResponse)
        if(paymentResponse.responseStatus){
            const response= await createOrder(data,userId)
            res.send(response)
        }
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message})
    }
})

module.exports = router;

