import React from 'react';
import VoiceRecorder from '../ui/VoiceRecorder';
import SectionTitle from '../ui/SectionTitle';

const VoiceRecording: React.FC = () => {
  const handleRecordingComplete = (audioBlob: Blob, audioUrl: string) => {
    console.log('Recording completed:', { audioBlob, audioUrl });
    // You can add additional logic here, such as:
    // - Uploading the recording to a server
    // - Analyzing the audio quality
    // - Providing feedback to the user
  };

  return (
    <section id="voice-recording" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Test Your Voice"
          subtitle="Record a sample to test your audio setup and hear how your voice sounds with professional recording techniques."
          centered
        />
        
        <div className="max-w-2xl mx-auto">
          <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
          
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Recording Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Environment</h4>
                <ul className="space-y-1">
                  <li>• Find a quiet room</li>
                  <li>• Minimize background noise</li>
                  <li>• Use soft furnishings to reduce echo</li>
                  <li>• Close windows and doors</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Technique</h4>
                <ul className="space-y-1">
                  <li>• Speak 6-8 inches from microphone</li>
                  <li>• Maintain consistent volume</li>
                  <li>• Speak clearly and naturally</li>
                  <li>• Take breaks to avoid fatigue</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2">Sample Script</h4>
            <p className="text-amber-700 italic">
              "Welcome to our innovative platform where technology meets creativity. 
              Our solutions are designed to empower businesses and individuals alike, 
              providing the tools you need to succeed in today's digital landscape."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceRecording;