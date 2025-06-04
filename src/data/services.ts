import { Service } from '../types';

export const services: Service[] = [
  {
    id: 1,
    title: 'Commercial Voice Over',
    description: 'Professional voice narration for your brand commercials, product videos, and promotional content.',
    price: 'From $350',
    features: [
      'Professional script reading',
      'Two rounds of revisions',
      'High-quality audio files (WAV & MP3)',
      'Fast 48-hour turnaround',
      'Commercial usage rights'
    ]
  },
  {
    id: 2,
    title: 'Corporate Narration',
    description: 'Clear, engaging voice over for corporate videos, training materials, and presentations.',
    price: 'From $450',
    features: [
      'Professional script reading',
      'Three rounds of revisions',
      'High-quality audio files (WAV & MP3)',
      'Background music selection assistance',
      'Corporate usage rights'
    ],
    popular: true
  },
  {
    id: 3,
    title: 'Character Voice Acting',
    description: 'Distinctive character voices for animation, video games, and interactive media.',
    price: 'From $500',
    features: [
      'Character voice development',
      'Multiple character options',
      'Three rounds of revisions',
      'High-quality audio files (WAV & MP3)',
      'Commercial usage rights'
    ]
  },
  {
    id: 4,
    title: 'Audiobook Narration',
    description: 'Immersive storytelling for fiction and non-fiction audiobooks with rich character development.',
    price: 'From $250/hour',
    features: [
      'Per-finished-hour rate',
      'Character voice consistency',
      'Professional editing and mastering',
      'ACX compliant files',
      'Retail-ready audio'
    ]
  }
];