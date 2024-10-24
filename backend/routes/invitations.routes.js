// routes/invitation.routes.js
const express = require('express');
const router = express.Router();
const invitationsController = require('../controllers/invitations.controller');

// Admin sends an invitation to a carer
router.post('/invite-carer', invitationsController.inviteCarer);

// Carer signs up using the invitation token
router.post('/signup-carer', invitationsController.signupCarer);

module.exports = router;