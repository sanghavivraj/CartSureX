const userModel = require('../../models/userModel');

async function deleteUserController(req, res) {
    try {
        const { userId } = req.params;

        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Delete the user
        await userModel.findByIdAndDelete(userId);

        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = deleteUserController;