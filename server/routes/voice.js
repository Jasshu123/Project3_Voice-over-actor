const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Contact = require('../models/Contact');
const VoiceRecording = require('../models/VoiceRecording');
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `voice-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept audio files
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'), false);
    }
  }
});

// Upload voice recording
router.post('/upload/:contactId', upload.single('voiceRecording'), async (req, res) => {
  try {
    const { contactId } = req.params;
    const { duration } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No audio file provided' });
    }

    // Verify contact exists
    const contact = await Contact.findById(contactId);
    if (!contact) {
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Create voice recording record
    const voiceRecording = new VoiceRecording({
      contactId: contactId,
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      duration: duration ? parseFloat(duration) : 0,
      mimeType: req.file.mimetype
    });

    await voiceRecording.save();

    // Update contact with voice recording reference
    contact.voiceRecording = voiceRecording._id;
    await contact.save();

    res.status(201).json({
      message: 'Voice recording uploaded successfully',
      recording: {
        id: voiceRecording._id,
        filename: voiceRecording.filename,
        duration: voiceRecording.duration,
        fileSize: voiceRecording.fileSize
      }
    });

  } catch (error) {
    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error('Voice recording upload error:', error);
    res.status(500).json({
      message: 'Failed to upload voice recording',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Get voice recording
router.get('/:recordingId', async (req, res) => {
  try {
    const recording = await VoiceRecording.findById(req.params.recordingId);
    
    if (!recording) {
      return res.status(404).json({ message: 'Recording not found' });
    }

    if (!fs.existsSync(recording.filePath)) {
      return res.status(404).json({ message: 'Audio file not found' });
    }

    res.sendFile(path.resolve(recording.filePath));
  } catch (error) {
    console.error('Error serving voice recording:', error);
    res.status(500).json({ message: 'Failed to serve recording' });
  }
});

// Delete voice recording
router.delete('/:recordingId', async (req, res) => {
  try {
    const recording = await VoiceRecording.findById(req.params.recordingId);
    
    if (!recording) {
      return res.status(404).json({ message: 'Recording not found' });
    }

    // Remove file from filesystem
    if (fs.existsSync(recording.filePath)) {
      fs.unlinkSync(recording.filePath);
    }

    // Remove recording reference from contact
    await Contact.findByIdAndUpdate(recording.contactId, {
      $unset: { voiceRecording: 1 }
    });

    // Delete recording record
    await VoiceRecording.findByIdAndDelete(req.params.recordingId);

    res.json({ message: 'Voice recording deleted successfully' });
  } catch (error) {
    console.error('Error deleting voice recording:', error);
    res.status(500).json({ message: 'Failed to delete recording' });
  }
});

// Get all recordings (admin only)
router.get('/', async (req, res) => {
  try {
    const recordings = await VoiceRecording.find()
      .populate('contactId', 'name email projectType createdAt')
      .sort({ createdAt: -1 });
    
    res.json(recordings);
  } catch (error) {
    console.error('Error fetching recordings:', error);
    res.status(500).json({ message: 'Failed to fetch recordings' });
  }
});

module.exports = router;