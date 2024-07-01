// routes/portfolioRoutes.js
const express = require('express');
const Portfolio = require('../models/Portfolio');
const router = express.Router();

router.get('/:userId', async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ where: { userId: req.params.userId } });
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/', async (req, res) => {
    const { userId, projects } = req.body;

    try {
        const portfolio = await Portfolio.create({ userId, projects });
        res.status(201).json({ message: 'Portfolio created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
