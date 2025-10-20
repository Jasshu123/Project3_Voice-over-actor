const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  projectType: {
    type: String,
    required: true,
    enum: ['commercial', 'corporate', 'e-learning', 'audiobook', 'character', 'ivr', 'other']
  },
  scriptLength: {
    type: String,
    required: true,
    enum: ['under-1', '1-5', '5-15', '15-30', '30+', 'not-sure']
  },
  deadline: {
    type: Date
  },
  budget: {
    type: String,
    enum: ['under-500', '500-1000', '1000-2500', '2500+', 'not-sure']
  },
  accent: {
    type: String,
    enum: ['neutral', 'british', 'australian', 'canadian', 'other']
  },
  tone: {
    type: String,
    enum: ['professional', 'conversational', 'energetic', 'serious', 'friendly', 'authoritative']
  },
  message: {
    type: String,
    required: true,
    maxlength: 2000
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'quoted', 'in-progress', 'completed', 'cancelled'],
    default: 'new'
  },
  voiceRecording: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VoiceRecording'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

contactSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Contact', contactSchema);