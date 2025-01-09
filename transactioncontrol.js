const User = require('../models/User');
const Transaction = require('../models/Transaction');

const initiateTransaction = async (req, res) => {
    const { receiverId, amount } = req.body;
    try {
        const sender = await User.findById(req.user.id);
        const receiver = await User.findById(receiverId);

        if (!receiver) {
            return res.status(404).json({ message: 'Receiver not found' });
        }

        if (sender.walletBalance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        sender.walletBalance -= amount;
        receiver.walletBalance += amount;

        await sender.save();
        await receiver.save();

        const transaction = new Transaction({
            sender: sender._id,
            receiver: receiver._id,
            amount
        });

        await transaction.save();
        res.status(201).json({ message: 'Transaction successful', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { initiateTransaction };