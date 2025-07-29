const productModel = require('../../models/productModel');

async function deleteProductController(req, res) {
    try {
        const { productId } = req.params;

        // Check if the product exists
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Delete the product
        await productModel.findByIdAndDelete(productId);

        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = deleteProductController;