import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Download, Trash2 } from 'lucide-react';
import Button from './Button';
import apiClient from '../../services/api';

interface VoiceRecorderProps {
  onRecordingComplete?: (audioBlob: Blob, audioUrl: string) => void;
  contactId?: string;
  autoUpload?: boolean;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ 
  onRecordingComplete, 
  contactId, 
  autoUpload = false 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasRecording, setHasRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentAudioBlobRef = useRef<Blob | null>(null);

  useEffect(() => {
    // Check if MediaRecorder is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsSupported(false);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        currentAudioBlobRef.current = audioBlob;
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setHasRecording(true);
        
        if (onRecordingComplete) {
          onRecordingComplete(audioBlob, url);
        }

        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Auto-upload if contactId is provided and autoUpload is true
      if (contactId && autoUpload && currentAudioBlobRef.current) {
        await uploadRecording(currentAudioBlobRef.current);
      }
    }
  };

  const uploadRecording = async (audioBlob: Blob) => {
    if (!contactId) {
      console.warn('No contact ID provided for upload');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      await apiClient.uploadVoiceRecording(contactId, audioBlob, recordingTime);
      setUploadStatus('success');
    } catch (error) {
      console.error('Failed to upload recording:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const playRecording = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const downloadRecording = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = `voice-recording-${new Date().toISOString().slice(0, 19)}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setHasRecording(false);
    setIsPlaying(false);
    setRecordingTime(0);
    currentAudioBlobRef.current = null;
    setUploadStatus('idle');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!isSupported) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600">Voice recording is not supported in your browser.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Voice Recorder</h3>
        <p className="text-slate-600">Record your voice to test audio quality</p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        {/* Recording Status */}
        <div className="text-center">
          {isRecording && (
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              <span className="font-medium">Recording: {formatTime(recordingTime)}</span>
            </div>
          )}
          {hasRecording && !isRecording && (
            <div className="text-green-600 font-medium">
              Recording ready ({formatTime(recordingTime)})
              {uploadStatus === 'success' && (
                <div className="text-green-600 text-sm mt-1">✓ Uploaded successfully</div>
              )}
              {uploadStatus === 'error' && (
                <div className="text-red-600 text-sm mt-1">✗ Upload failed</div>
              )}
            </div>
          )}
        </div>

        {/* Recording Controls */}
        <div className="flex space-x-3">
          {!isRecording && !hasRecording && (
            <Button
              onClick={startRecording}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600"
            >
              <Mic size={18} />
              <span>Start Recording</span>
            </Button>
          )}

          {isRecording && (
            <Button
              onClick={stopRecording}
              variant="secondary"
              className="flex items-center space-x-2"
            >
              <Square size={18} />
              <span>Stop Recording</span>
            </Button>
          )}

          {hasRecording && !isRecording && (
            <>
              <Button
                onClick={startRecording}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600"
              >
                <Mic size={18} />
                <span>Record Again</span>
              </Button>
              
              {!isPlaying ? (
                <Button
                  onClick={playRecording}
                  variant="secondary"
                  className="flex items-center space-x-2"
                >
                  <Play size={18} />
                  <span>Play</span>
                </Button>
              ) : (
                <Button
                  onClick={pauseRecording}
                  variant="secondary"
                  className="flex items-center space-x-2"
                >
                  <Pause size={18} />
                  <span>Pause</span>
                </Button>
              )}
            </>
          )}

          {/* Upload button for manual upload */}
          {hasRecording && !isRecording && contactId && !autoUpload && (
            <Button
              onClick={() => currentAudioBlobRef.current && uploadRecording(currentAudioBlobRef.current)}
              disabled={isUploading || uploadStatus === 'success'}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Uploading...</span>
                </>
              ) : uploadStatus === 'success' ? (
                <span>✓ Uploaded</span>
              ) : (
                <span>Upload Recording</span>
              )}
            </Button>
          )}
        </div>

        {/* Playback and Actions */}
        {hasRecording && (
          <div className="flex space-x-2">
            <Button
              onClick={downloadRecording}
              variant="outline"
              size="sm"
              className="flex items-center space-x-1"
            >
              <Download size={16} />
              <span>Download</span>
            </Button>
            
            <Button
              onClick={deleteRecording}
              variant="outline"
              size="sm"
              className="flex items-center space-x-1 text-red-600 hover:text-red-700"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </Button>
          </div>
        )}

        {/* Audio Element */}
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        )}
      </div>

      {/* Instructions */}
      <div className="mt-6 text-sm text-slate-500 text-center">
        <p>Click "Start Recording" and speak into your microphone.</p>
        <p>Your browser may ask for microphone permission.</p>
      </div>
    </div>
  );
};

export default VoiceRecorder;