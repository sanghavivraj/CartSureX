const express = require("express");
const router = express.Router();
const passport = require("passport");
const authToken = require("../middleware/authToken");
const jwt = require("jsonwebtoken")

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const UploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const updateProfileController = require("../controller/user/updateProfileController");
const deleteUserController = require("../controller/user/deleteUserController");
const deleteProductController = require("../controller/product/deleteProductController");
const addAddress = require("../controller/user/addAddressController");
const updateAddress = require("../controller/user/updateAddressController");
const deleteAddress = require("../controller/user/deleteAddressController");
const getUserAddresses = require("../controller/user/getUserAddressesController");
const paymentController = require("../controller/order/paymentController");
const webhooks = require('../controller/order/webhook');
const orderController = require('../controller/order/order.controller');
const allOrderController = require("../controller/order/allOrder.controller");
const warrantyController = require("../controller/order/warrantyController");
const getAllWarranties = require("../controller/order/getAllWarranties");
const updateWarranty = require("../controller/order/updateWarranty");
const updateOrderController = require("../controller/order/updateOrder");
const deleteWarrantyController=require("../controller/order/deleteWarrantyController");

// User routes
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.get("/auth/google/success", (req, res) => {
  const token = req.cookies.token;
  
  if (!token) {
      return res.status(401).json({
          success: false,
          message: "Not authenticated"
      });
  }

  res.status(200).json({
      success: true,
      token: token,
      message: "Authentication successful"
  });
});

router.get("/google/failed", (req, res) => {
  res.status(401).json({
      error: true,
      message: "Google login failed"
  });
});
// Google Auth Routes
router.get("/auth/google", passport.authenticate("google", { 
  scope: ["profile", "email"],
  session: false 
}));

router.get("/auth/google/callback", 
  passport.authenticate("google", { 
    failureRedirect: `${process.env.FRONTEND_URL}/login-failed`,
    session: false 
  }),
  async (req, res) => {
    try {
      // Generate JWT token (same as email/password login)
      const tokenData = {
        _id: req.user._id,
        email: req.user.email
      };
      
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '7d' });

      // Set cookie exactly like your email/password login
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      // Redirect to home page
      res.redirect(`${process.env.FRONTEND_URL}/`);
      
    } catch (err) {
      console.error("Google callback error:", err);
      res.redirect(`${process.env.FRONTEND_URL}/login-failed`);
    }
  }
);

// New endpoint to get user details with JWT
router.get("/auth/google/user", authToken, async (req, res) => {
  try {
      const user = await User.findById(req.userId).select('-password');
      res.status(200).json({
          success: true,
          data: user
      });
  } catch (error) {
      res.status(400).json({
          success: false,
          message: error.message
      });
  }
});
// Admin panel routes
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);
router.delete("/delete-user/:userId", authToken, deleteUserController); // New route

// Product routes
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.delete("/delete-product/:productId", authToken, deleteProductController); // New route
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

// User add to cart routes
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

// Profile routes
router.get("/profile", authToken, userDetailsController);
router.post("/update-profile", authToken, updateProfileController);

//address
router.post("/address", authToken, addAddress);
router.put("/address/:id", authToken, updateAddress);
router.delete("/address/:id", authToken, deleteAddress);
router.get("/addresses/:userId", authToken, getUserAddresses);

//payment and order
router.post("/checkout", authToken, paymentController);
router.post("/webhook", webhooks);
router.get("/order-list", authToken, orderController);
router.get("/all-order", authToken, allOrderController);

// router.post('/webhook', express.raw({type: 'application/json'}), webhooks);

router.get("/warranty/:warrantyId",authToken,warrantyController.getWarrantyDetails);
router.get("/warranties", authToken, getAllWarranties);
router.post("/warranty/update", authToken, updateWarranty);
router.delete("/warranty/:warrantyId", authToken, deleteWarrantyController);
router.put("/update-order/:orderId", authToken, updateOrderController);

module.exports = router;
