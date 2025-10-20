import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// API client configuration
class ApiClient {
  // Contact form submission
  async submitContact(contactData: any) {
    const { data, error } = await supabase
      .from('contacts')
      .insert([{
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone || null,
        project_type: contactData.projectType,
        script_length: contactData.scriptLength,
        deadline: contactData.deadline || null,
        budget: contactData.budget || null,
        accent: contactData.accent || null,
        tone: contactData.tone || null,
        message: contactData.message,
        status: 'new'
      }])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { contactId: data.id, ...data };
  }

  // Voice recording upload
  async uploadVoiceRecording(contactId: string, audioBlob: Blob, duration?: number) {
    // Upload audio file to Supabase Storage
    const fileName = `${contactId}-${Date.now()}.wav`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('voice-recordings')
      .upload(fileName, audioBlob, {
        contentType: 'audio/wav',
        upsert: false
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('voice-recordings')
      .getPublicUrl(fileName);

    // Create voice recording record
    const { data, error } = await supabase
      .from('voice_recordings')
      .insert([{
        contact_id: contactId,
        file_path: publicUrl,
        duration: duration || null,
        file_size: audioBlob.size,
        mime_type: 'audio/wav'
      }])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Get voice recording
  getVoiceRecordingUrl(recordingId: string): string {
    // This would typically fetch from the database and return the file_path
    return recordingId;
  }

  // Delete voice recording
  async deleteVoiceRecording(recordingId: string) {
    const { error } = await supabase
      .from('voice_recordings')
      .delete()
      .eq('id', recordingId);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  }

  // Admin endpoints
  async getAllContacts() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*, voice_recordings(*)')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getContact(contactId: string) {
    const { data, error } = await supabase
      .from('contacts')
      .select('*, voice_recordings(*)')
      .eq('id', contactId)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async updateContactStatus(contactId: string, status: string) {
    const { data, error } = await supabase
      .from('contacts')
      .update({ status })
      .eq('id', contactId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getAllVoiceRecordings() {
    const { data, error } = await supabase
      .from('voice_recordings')
      .select('*, contacts(*)')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}

export const apiClient = new ApiClient();
export default apiClient;