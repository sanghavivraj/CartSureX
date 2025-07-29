const Address = require('../../models/Address');

const addAddress = async (req, res) => {
  const { userId, addressLine1, addressLine2, city, state, postalCode, isPrimary } = req.body;

  try {
    const newAddress = new Address({
      userId,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      isPrimary
    });

    await newAddress.save();
    res.status(201).json({ message: 'Address added successfully', address: newAddress });
  } catch (error) {
    res.status(500).json({ message: 'Error adding address', error: error.message });
  }
};

module.exports = addAddress;