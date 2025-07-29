const Address = require('../../models/Address');

const updateAddress = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedAddress = await Address.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.status(200).json({ message: 'Address updated successfully', address: updatedAddress });
  } catch (error) {
    res.status(500).json({ message: 'Error updating address', error: error.message });
  }
};

module.exports = updateAddress;