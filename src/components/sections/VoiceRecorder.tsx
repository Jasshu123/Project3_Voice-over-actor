import React, { useEffect, useRef, useState } from 'react';
import { Mic, Square, Play, Download, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import WaveSurfer from 'wavesurfer.js';

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [convertedAudio, setConvertedAudio] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const waveformRef = useRef<WaveSurfer | null>(null);
  const waveformContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (waveformContainerRef.current && recordedAudio) {
      waveformRef.current = WaveSurfer.create({
        container: waveformContainerRef.current,
        waveColor: '#f59e0b',
        progressColor: '#d97706',
        cursorColor: '#78350f',
        height: 80,
        normalize: true,
      });

      const audioUrl = URL.createObjectURL(recordedAudio);
      waveformRef.current.load(audioUrl);

      waveformRef.current.on('play', () => setIsPlaying(true));
      waveformRef.current.on('pause', () => setIsPlaying(false));
      waveformRef.current.on('finish', () => setIsPlaying(false));

      return () => {
        waveformRef.current?.destroy();
      };
    }
  }, [recordedAudio]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setRecordedAudio(blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Unable to access microphone. Please ensure you have granted permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const togglePlayback = () => {
    if (waveformRef.current) {
      waveformRef.current.playPause();
    }
  };

  const convertAccent = async () => {
    setIsProcessing(true);
    try {
      // Simulate accent conversion processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would:
      // 1. Send the audio to your backend
      // 2. Process it with an accent conversion model
      // 3. Receive the converted audio and update the UI
      
      setConvertedAudio(URL.createObjectURL(recordedAudio!));
    } catch (error) {
      console.error('Error converting accent:', error);
      alert('Error converting accent. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAudio = (isConverted: boolean) => {
    const audio = isConverted ? convertedAudio : recordedAudio;
    if (!audio) return;

    const url = isConverted ? audio : URL.createObjectURL(audio);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voice-recording-${isConverted ? 'converted' : 'original'}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Voice Recorder</h1>
          
          <div className="space-y-8">
            {/* Recording Controls */}
            <div className="flex justify-center gap-4">
              {!isRecording ? (
                <Button
                  onClick={startRecording}
                  className="flex items-center gap-2"
                >
                  <Mic size={20} />
                  Start Recording
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={stopRecording}
                  className="flex items-center gap-2"
                >
                  <Square size={20} />
                  Stop Recording
                </Button>
              )}
            </div>

            {/* Waveform Display */}
            {recordedAudio && (
              <div className="space-y-4">
                <div 
                  ref={waveformContainerRef} 
                  className="border border-slate-200 rounded-lg p-4"
                />
                
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={togglePlayback}
                    className="flex items-center gap-2"
                  >
                    <Play size={20} />
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  
                  <Button
                    onClick={() => downloadAudio(false)}
                    className="flex items-center gap-2"
                  >
                    <Download size={20} />
                    Download Original
                  </Button>
                </div>

                <div className="border-t border-slate-200 pt-6 mt-6">
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">Accent Conversion</h2>
                  
                  {!convertedAudio ? (
                    <Button
                      onClick={convertAccent}
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Converting...
                        </>
                      ) : (
                        'Convert Accent'
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <audio controls className="w-full">
                        <source src={convertedAudio} type="audio/wav" />
                        Your browser does not support the audio element.
                      </audio>
                      
                      <Button
                        onClick={() => downloadAudio(true)}
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <Download size={20} />
                        Download Converted Audio
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceRecorder;