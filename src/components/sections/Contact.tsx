import React from 'react';
import { Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import SectionTitle from '../ui/SectionTitle';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  scriptLength: string;
  deadline: string;
  budget: string;
  message: string;
  accent: string;
  tone: string;
}

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      // Here you would typically send the data to your backend
      console.log(data);
      
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to voice recording page
      navigate('/record-voice', { 
        state: { 
          name: data.name,
          projectType: data.projectType,
          formData: data
        } 
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your inquiry. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Get In Touch"
          subtitle="Ready to bring your script to life? Let's discuss your voice over project in detail."
          centered
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Project Details</h3>
            <p className="text-slate-600 mb-8">
              Fill out the form with your project requirements. I'll review your needs and provide a custom quote along with sample recordings if needed.
            </p>
            
            <div className="space-y-6">
              <ContactInfoItem 
                icon={<MessageSquare />}
                title="Email Me At"
                info="hello@voiceartistry.com"
              />
              <ContactInfoItem 
                icon={<Clock />}
                title="Response Time"
                info="Within 24 hours"
              />
              <ContactInfoItem 
                icon={<CheckCircle />}
                title="Booking Availability"
                info="Currently accepting new projects"
              />
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-8 shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors ${
                      errors.name ? 'border-red-500' : 'border-slate-300'
                    }`}
                    {...register('name', { required: true })}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-slate-300'
                    }`}
                    {...register('email', { 
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    })}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">Valid email is required</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-slate-700 mb-1">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors ${
                      errors.projectType ? 'border-red-500' : 'border-slate-300'
                    }`}
                    {...register('projectType', { required: true })}
                  >
                    <option value="">Select project type</option>
                    <option value="commercial">Commercial</option>
                    <option value="corporate">Corporate/Business</option>
                    <option value="e-learning">E-Learning</option>
                    <option value="audiobook">Audiobook</option>
                    <option value="character">Character/Animation</option>
                    <option value="ivr">IVR/Phone System</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.projectType && <p className="text-red-500 text-xs mt-1">Project type is required</p>}
                </div>

                <div>
                  <label htmlFor="scriptLength" className="block text-sm font-medium text-slate-700 mb-1">
                    Script Length *
                  </label>
                  <select
                    id="scriptLength"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors ${
                      errors.scriptLength ? 'border-red-500' : 'border-slate-300'
                    }`}
                    {...register('scriptLength', { required: true })}
                  >
                    <option value="">Select length</option>
                    <option value="under-1">Under 1 minute</option>
                    <option value="1-5">1-5 minutes</option>
                    <option value="5-15">5-15 minutes</option>
                    <option value="15-30">15-30 minutes</option>
                    <option value="30+">30+ minutes</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                  {errors.scriptLength && <p className="text-red-500 text-xs mt-1">Script length is required</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-slate-700 mb-1">
                    Project Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                    {...register('deadline')}
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-slate-700 mb-1">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                    {...register('budget')}
                  >
                    <option value="">Select budget range</option>
                    <option value="under-500">Under $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000-2500">$1,000 - $2,500</option>
                    <option value="2500+">$2,500+</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="accent" className="block text-sm font-medium text-slate-700 mb-1">
                    Preferred Accent
                  </label>
                  <select
                    id="accent"
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                    {...register('accent')}
                  >
                    <option value="">Select accent</option>
                    <option value="neutral">Neutral American</option>
                    <option value="british">British</option>
                    <option value="australian">Australian</option>
                    <option value="canadian">Canadian</option>
                    <option value="other">Other (specify in details)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tone" className="block text-sm font-medium text-slate-700 mb-1">
                    Desired Tone
                  </label>
                  <select
                    id="tone"
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                    {...register('tone')}
                  >
                    <option value="">Select tone</option>
                    <option value="professional">Professional</option>
                    <option value="conversational">Conversational</option>
                    <option value="energetic">Energetic</option>
                    <option value="serious">Serious</option>
                    <option value="friendly">Friendly</option>
                    <option value="authoritative">Authoritative</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors ${
                    errors.message ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Please provide details about your project, including any specific requirements, script details, or reference examples..."
                  {...register('message', { required: true })}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">Project details are required</p>}
              </div>
              
              <Button type="submit" className="w-full flex items-center justify-center">
                <Send size={18} className="mr-2" />
                Submit Project Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  info: string;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon, title, info }) => {
  return (
    <div className="flex items-start">
      <div className="text-amber-500 mr-4 mt-1">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-800 mb-1">{title}</h4>
        <p className="text-slate-600">{info}</p>
      </div>
    </div>
  );
};

export default Contact;