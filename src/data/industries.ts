import { Industry } from '../types';
import { BookOpen, Tv, Building2, Gamepad2, GraduationCap, Radio } from 'lucide-react';

export const industries: Industry[] = [
  {
    id: 1,
    name: 'Audiobooks',
    icon: 'BookOpen',
    description: 'Engaging narration for fiction and non-fiction titles with character distinction.'
  },
  {
    id: 2,
    name: 'Commercials',
    icon: 'Tv',
    description: 'Persuasive and memorable voice overs for TV, radio, and online advertisements.'
  },
  {
    id: 3,
    name: 'Corporate',
    icon: 'Building2',
    description: 'Professional narration for training videos, presentations, and explainers.'
  },
  {
    id: 4,
    name: 'Video Games',
    icon: 'Gamepad2',
    description: 'Character voices and narration for immersive gaming experiences.'
  },
  {
    id: 5,
    name: 'E-Learning',
    icon: 'GraduationCap',
    description: 'Clear, instructional narration for educational content and courses.'
  },
  {
    id: 6,
    name: 'Podcasts',
    icon: 'Radio',
    description: 'Professional intros, outros, and advertisements for podcast productions.'
  }
];

export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'BookOpen':
      return BookOpen;
    case 'Tv':
      return Tv;
    case 'Building2':
      return Building2;
    case 'Gamepad2':
      return Gamepad2;
    case 'GraduationCap':
      return GraduationCap;
    case 'Radio':
      return Radio;
    default:
      return BookOpen;
  }
};