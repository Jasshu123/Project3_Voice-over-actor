const mongoose = require('mongoose');

const voiceRecordingSchema = new mongoose.Schema({
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  mimeType: {
    type: String,
    required: true
  },
  quality: {
    sampleRate: Number,
    bitRate: Number,
    channels: Number
  },
  transcription: {
    type: String,
    default: ''
  },
  analysis: {
    clarity: Number,
    volume: Number,
    backgroundNoise: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('VoiceRecording', voiceRecordingSchema);