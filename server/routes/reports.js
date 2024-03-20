const express = require('express');
const router = express.Router();
const {DB} = require('../db/db');

router.post('/:leaseId', async (req, res) => {
    const leaseId = req.params.leaseId;

    try {
        // Fetch the lease from the database
        const db = new DB();
        const lease = await db.findLeaseById(leaseId);

        if (!lease) {
            return res.status(404).json({ error: 'Lease not found' });
        }

        // Increment the reports field
        lease.reports = (lease.reports || 0) + 1;

        await db.updateLease(leaseId, lease);
        res.status(200).json({ message: 'Reports field incremented successfully', lease });

    } catch (error) {
        console.error('Error incrementing reports field:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = {
    leaseReport: router
};