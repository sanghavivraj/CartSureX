const addToCartModel = require("../../models/cartProduct")

const addToCartController = async(req,res)=>{
    try{
        const { productId } = req?.body
        const currentUser = req.userId

        // Check if this product already exists in THIS USER'S cart
        const isProductAvailable = await addToCartModel.findOne({ 
            productId: productId,
            userId: currentUser 
        })

        console.log("isProductAvailable   ",isProductAvailable)

        if(isProductAvailable){
            return res.json({
                message : "Already exists in your cart",
                success : false,
                error : true
            })
        }

        const payload  = {
            productId : productId,
            quantity : 1,
            userId : currentUser,
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            data : saveProduct,
            message : "Product Added in Cart",
            success : true,
            error : false
        })
        

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = addToCartController