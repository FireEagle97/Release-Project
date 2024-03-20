const express = require('express');
const router = express.Router();
const {DB} = require('../db/db');

const idRegex = /^[a-f\d]{24}$|^\d{1,12}$|^(?:(?:[0-9a-fA-F]{2}){12})$/;

router.delete('/:leaseId', async (req, res) => {
    const leaseId = req.params.leaseId;

    if (!idRegex.test(leaseId)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        // Fetch the lease from the database
        const db = new DB();
        const lease = await db.findLeaseById(leaseId);

        if (!lease) {
            return res.status(404).json({ error: 'Lease not found' });
        }

        // Delete the lease
        await db.deleteLease(leaseId);
        res.status(200).json({ message: 'Lease deleted successfully' });
    } catch (error) {
        console.error('Error deleting lease:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = {
    leaseDelete: router
};