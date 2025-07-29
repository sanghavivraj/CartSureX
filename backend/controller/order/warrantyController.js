const Warranty = require("../../models/warrantyModel");

const getWarrantyDetails = async (request, response) => {
    try {
        const { warrantyId } = request.params;
        const warranty = await Warranty.findOne({ warrantyId });

        if (!warranty) {
            return response.status(404).json({
                success: false,
                message: "Warranty not found",
            });
        }

        response.status(200).json({
            success: true,
            data: warranty,
        });
    } catch (error) {
        response.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getUserWarranties = async (request, response) => {
    try {
        const userId = request.userId;
        
        if (!userId) {
            return response.status(401).json({
                success: false,
                message: "Unauthorized - Please login first"
            });
        }

        const warranties = await Warranty.find({ userId })
            .sort({ warrantyEndDate: 1 });

        response.status(200).json({
            success: true,
            data: warranties,
            message: "Warranties retrieved successfully"
        });
    } catch (error) {
        response.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getWarrantyDetails,
    getUserWarranties
};