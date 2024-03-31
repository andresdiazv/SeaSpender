const express = require('express');
const Transaction = require('../models/Transaction');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

// Middleware to protect routes
router.use(requireAuth);

// POST route to add a new transaction
router.post('/', async (req, res) => {
  try {
    const transaction = new Transaction({ ...req.body, user: req.auth.userId });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET route to fetch transactions for the logged-in user
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.auth.userId });
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET route to fetch a single transaction by its ID
router.get('/:id', async (req, res) => {
    try {
      const transaction = await Transaction.findOne({ _id: req.params.id, user: req.auth.userId });
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ error: 'Error fetching transaction' });
    }
  });
  

// PUT route to update a transaction
router.put('/:id', async (req, res) => {
    try {
      const transaction = await Transaction.findOneAndUpdate(
        { _id: req.params.id, user: req.auth.userId },
        req.body,
        { new: true } // Return the updated object
      );
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ error: 'Error updating transaction' });
    }
  });  

// DELETE route to delete a transaction
router.delete('/:id', async (req, res) => {
    try {
      const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.auth.userId });
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.status(204).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Error deleting transaction' });
    }
  });
  
module.exports = router;
