import React from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import VoiceRecorder from '../ui/VoiceRecorder';

const RecordVoicePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { 
    name?: string; 
    projectType?: string; 
    formData?: any;
  } | null;

  const goToSuccess = () => {
    navigate('/success', { 
      state: { 
        name: state?.name,
        projectType: state?.projectType,
        hasRecording: true
      } 
    });
  };

  const goBack = () => {
    navigate('/');
  };

  const handleRecordingComplete = (audioBlob: Blob, audioUrl: string) => {
    console.log('Recording completed:', { audioBlob, audioUrl });
    // Here you could upload the recording to your server
    // or store it temporarily for the user
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-slate-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={goBack}
                className="mr-4 p-2 hover:bg-slate-800 rounded-full transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Record Your Voice</h1>
                <p className="text-slate-300">Step 2 of 2: Voice Sample Recording</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Welcome Message */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-start">
              <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  Thank you{state?.name ? `, ${state.name}` : ''}!
                </h2>
                <p className="text-slate-600 mb-4">
                  Your {state?.projectType || 'project'} inquiry has been received. Now, let's record a voice sample 
                  to help me better understand your needs and provide you with the most accurate quote.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h3 className="font-semibold text-amber-800 mb-2">Why record a voice sample?</h3>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li>• Helps me understand your audio quality requirements</li>
                    <li>• Allows me to provide more accurate pricing</li>
                    <li>• Gives you a chance to test your recording setup</li>
                    <li>• Optional but highly recommended for better service</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Voice Recorder Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
            </div>

            <div className="space-y-6">
              {/* Sample Scripts */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Sample Scripts</h3>
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Commercial Style</h4>
                    <p className="text-slate-600 italic text-sm">
                      "Introducing the future of technology. Our innovative solutions are designed 
                      to transform the way you work, play, and connect. Experience the difference today."
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Corporate/Educational</h4>
                    <p className="text-slate-600 italic text-sm">
                      "Welcome to our comprehensive training module. In this session, we'll explore 
                      key concepts and practical applications that will enhance your professional skills 
                      and knowledge base."
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Conversational</h4>
                    <p className="text-slate-600 italic text-sm">
                      "Hi there! Thanks for choosing our service. We're here to help you every step 
                      of the way. Whether you're just getting started or looking to expand, 
                      we've got you covered."
                    </p>
                  </div>
                </div>
              </div>

              {/* Recording Tips */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Recording Tips</h3>
                <div className="grid grid-cols-1 gap-4 text-sm text-slate-600">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Environment</h4>
                    <ul className="space-y-1">
                      <li>• Find a quiet room with minimal echo</li>
                      <li>• Close windows and doors</li>
                      <li>• Turn off fans and air conditioning</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Technique</h4>
                    <ul className="space-y-1">
                      <li>• Speak 6-8 inches from your microphone</li>
                      <li>• Maintain consistent volume and pace</li>
                      <li>• Speak clearly and naturally</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={goToSuccess}
              size="lg"
              className="flex items-center justify-center"
            >
              Continue to Confirmation
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={goBack}
              className="flex items-center justify-center"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Homepage
            </Button>
          </div>

          {/* Note */}
          <div className="mt-6 text-center text-slate-500 text-sm">
            <p>Recording a voice sample is optional but helps me provide better service.</p>
            <p>You can skip this step and go directly to confirmation if preferred.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecordVoicePage;