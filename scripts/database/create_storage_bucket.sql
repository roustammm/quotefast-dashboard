-- Create storage bucket for project photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-photos',
  'project-photos', 
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
);

-- Create policy for public access to project photos
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'project-photos');

-- Create policy for authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'project-photos' 
  AND auth.role() = 'authenticated'
);

-- Create policy for users to update their own files
CREATE POLICY "Users can update own files" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'project-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create policy for users to delete their own files
CREATE POLICY "Users can delete own files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'project-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
