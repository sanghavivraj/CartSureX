const Address = require('../../models/Address');

const getUserAddresses = async (req, res) => {
  const { userId } = req.params;

  try {
    const addresses = await Address.find({ userId });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching addresses', error: error.message });
  }
};

module.exports = getUserAddresses;