const userModel = require('../../models/userModel');

async function updateProfileController(req, res) {
  try {
    const { userId } = req; 
    const { name, email, profilePic } = req.body; // Fields to update

    // Update the user's profile in the database
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, email, profilePic },
      { new: true } // Return the updated user
    );

    res.json({
      message: 'Profile updated successfully',
      data: updatedUser,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateProfileController;