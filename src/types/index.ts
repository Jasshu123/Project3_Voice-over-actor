export interface Testimonial {
  id: number;
  name: string;
  company: string;
  text: string;
  image: string;
}

export interface VoiceSample {
  id: number;
  title: string;
  category: string;
  audioUrl: string;
  duration: string;
  description: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export interface Industry {
  id: number;
  name: string;
  icon: string;
  description: string;
}