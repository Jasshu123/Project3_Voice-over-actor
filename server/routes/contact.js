const express = require('express');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const router = express.Router();

// Email transporter setup
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      projectType,
      scriptLength,
      deadline,
      budget,
      accent,
      tone,
      message
    } = req.body;

    // Validate required fields
    if (!name || !email || !projectType || !scriptLength || !message) {
      return res.status(400).json({
        message: 'Missing required fields',
        required: ['name', 'email', 'projectType', 'scriptLength', 'message']
      });
    }

    // Create new contact
    const contact = new Contact({
      name,
      email,
      phone,
      projectType,
      scriptLength,
      deadline: deadline ? new Date(deadline) : undefined,
      budget,
      accent,
      tone,
      message
    });

    await contact.save();

    // Send notification email to admin
    if (process.env.SMTP_USER && process.env.ADMIN_EMAIL) {
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Voice Over Inquiry - ${projectType}`,
        html: `
          <h2>New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <p><strong>Script Length:</strong> ${scriptLength}</p>
          <p><strong>Deadline:</strong> ${deadline || 'Not specified'}</p>
          <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
          <p><strong>Accent:</strong> ${accent || 'Not specified'}</p>
          <p><strong>Tone:</strong> ${tone || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `
      };

      await transporter.sendMail(mailOptions);
    }

    // Send confirmation email to client
    if (process.env.SMTP_USER) {
      const clientMailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Thank you for your voice over inquiry',
        html: `
          <h2>Thank you for your inquiry, ${name}!</h2>
          <p>I've received your ${projectType} project inquiry and will review it shortly.</p>
          <p>You can expect to hear back from me within 24 hours with a custom quote and any follow-up questions.</p>
          <p>If you have any urgent questions, feel free to reply to this email.</p>
          <br>
          <p>Best regards,<br>Alex Morgan<br>VoiceArtistry</p>
        `
      };

      await transporter.sendMail(clientMailOptions);
    }

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contactId: contact._id
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      message: 'Failed to submit contact form',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Get all contacts (admin only)
router.get('/all', async (req, res) => {
  try {
    const contacts = await Contact.find()
      .populate('voiceRecording')
      .sort({ createdAt: -1 });
    
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
});

// Get contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('voiceRecording');
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ message: 'Failed to fetch contact' });
  }
});

// Update contact status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'reviewed', 'quoted', 'in-progress', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({ message: 'Failed to update contact status' });
  }
});

module.exports = router;