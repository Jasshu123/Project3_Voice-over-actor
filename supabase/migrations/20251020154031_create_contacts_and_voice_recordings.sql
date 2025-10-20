/*
  # Create Voice Over Portfolio Database Schema

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text, required) - Contact's full name
      - `email` (text, required) - Contact's email address
      - `phone` (text, optional) - Contact's phone number
      - `project_type` (text, required) - Type of voice over project
      - `script_length` (text, required) - Length of the script
      - `deadline` (date, optional) - Project deadline
      - `budget` (text, optional) - Budget range for the project
      - `accent` (text, optional) - Preferred accent
      - `tone` (text, optional) - Desired tone
      - `message` (text, required) - Project details and requirements
      - `status` (text, default 'new') - Status of the inquiry
      - `created_at` (timestamptz, auto-generated)
      - `updated_at` (timestamptz, auto-generated)

    - `voice_recordings`
      - `id` (uuid, primary key)
      - `contact_id` (uuid, foreign key) - Reference to contacts table
      - `file_path` (text, required) - Path/URL to the audio file
      - `duration` (integer, optional) - Duration of the recording in seconds
      - `file_size` (integer, optional) - File size in bytes
      - `mime_type` (text, default 'audio/wav') - MIME type of the audio file
      - `created_at` (timestamptz, auto-generated)

  2. Security
    - Enable RLS on both tables
    - Public can insert contacts (for form submissions)
    - Only authenticated users can read/update contacts (admin access)
    - Voice recordings follow similar access patterns
*/

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  project_type text NOT NULL CHECK (project_type IN ('commercial', 'corporate', 'e-learning', 'audiobook', 'character', 'ivr', 'other')),
  script_length text NOT NULL CHECK (script_length IN ('under-1', '1-5', '5-15', '15-30', '30+', 'not-sure')),
  deadline date,
  budget text CHECK (budget IN ('under-500', '500-1000', '1000-2500', '2500+', 'not-sure')),
  accent text CHECK (accent IN ('neutral', 'british', 'australian', 'canadian', 'other')),
  tone text CHECK (tone IN ('professional', 'conversational', 'energetic', 'serious', 'friendly', 'authoritative')),
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'quoted', 'in-progress', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create voice_recordings table
CREATE TABLE IF NOT EXISTS voice_recordings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  file_path text NOT NULL,
  duration integer,
  file_size integer,
  mime_type text DEFAULT 'audio/wav',
  created_at timestamptz DEFAULT now()
);

-- Create index on contact_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_voice_recordings_contact_id ON voice_recordings(contact_id);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_recordings ENABLE ROW LEVEL SECURITY;

-- Contacts policies
CREATE POLICY "Anyone can insert contacts"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (true);

-- Voice recordings policies
CREATE POLICY "Anyone can insert voice recordings"
  ON voice_recordings FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view voice recordings"
  ON voice_recordings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete voice recordings"
  ON voice_recordings FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for contacts table
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
