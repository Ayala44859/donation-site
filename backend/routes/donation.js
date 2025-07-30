const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

router.get('/', async (req, res) => {
    try {
        const donations = await Donation.find({}).sort({ date: -1 });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/', async (req, res) => {
    const { name, sum, dedication } = req.body;

    if (!name || !sum) {
        return res.status(400).json({ message: 'Please enter all required fields: name and sum' });
    }
    try {
        const newDonation = await Donation.create({
            name,
            sum,
            dedication,
        });
        res.status(201).json(newDonation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put('/:id', async (req, res) => {
    const { name, sum, dedication } = req.body;
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }
        donation.name = name || donation.name;
        donation.sum = sum || donation.sum;
        donation.dedication = dedication || donation.dedication;

        const updatedDonation = await donation.save();
        res.json(updatedDonation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }
        await donation.deleteOne();
        res.json({ message: 'Donation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;