const authenticateUser = require("../../utils/authenticateUser");
const express = require("express");
const { createAddress, createOrder, validatePayment, getCart} = require("./paymentcontroller");
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
        console.log(data)
        const paymentResponse= await validatePayment(data,userId)
        console.log("before if", paymentResponse)
        if(paymentResponse.responseStatus){
            console.log("inside if")
            const response= await createOrder(data,userId)
            console.log(response)
            res.send(response)
        }
        else{
            console.log("payment response" ,paymentResponse)
            console.log("type", typeof paymentResponse)
            
            res.send(JSON.stringify(paymentResponse))

        }
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message})
    }
})

router.get("/getcart", authenticateUser, async(req,res)=>{
    try {
        
        const userId = req.user.id;
        const response= await getCart(userId)
            res.send(response)
        
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message})
    }
})

module.exports = router;

