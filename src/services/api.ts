const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// API client configuration
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  // Contact form submission
  async submitContact(contactData: any) {
    return this.request('/contact/submit', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // Voice recording upload
  async uploadVoiceRecording(contactId: string, audioBlob: Blob, duration?: number) {
    const formData = new FormData();
    formData.append('voiceRecording', audioBlob, 'voice-recording.wav');
    if (duration) {
      formData.append('duration', duration.toString());
    }

    return this.request(`/voice/upload/${contactId}`, {
      method: 'POST',
      headers: {
        // Remove Content-Type header to let browser set it with boundary for FormData
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    });
  }

  // Get voice recording
  getVoiceRecordingUrl(recordingId: string): string {
    return `${this.baseURL}/voice/${recordingId}`;
  }

  // Delete voice recording
  async deleteVoiceRecording(recordingId: string) {
    return this.request(`/voice/${recordingId}`, {
      method: 'DELETE',
    });
  }

  // Auth endpoints
  async register(userData: { name: string; email: string; password: string; role?: string }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  // Admin endpoints
  async getAllContacts() {
    return this.request('/contact/all');
  }

  async getContact(contactId: string) {
    return this.request(`/contact/${contactId}`);
  }

  async updateContactStatus(contactId: string, status: string) {
    return this.request(`/contact/${contactId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async getAllVoiceRecordings() {
    return this.request('/voice/');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;