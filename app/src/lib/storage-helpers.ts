import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { supabase } from './supabase';

/**
 * Uploads an image to Supabase Storage
 * @param uri Local URI of the image
 * @param bucket Bucket name in Supabase Storage
 * @param userId User ID for naming
 * @returns URL of the uploaded image or null if failed
 */
export const uploadImage = async (
  uri: string,
  bucket: string,
  userId: string
): Promise<string | null> => {
  try {
    const fileExt = uri.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Read file and convert to base64
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
    
    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, decode(base64), {
        contentType: `image/${fileExt}`,
        upsert: true,
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // Get public URL
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    return null;
  }
};

/**
 * Uploads a document to Supabase Storage
 * @param uri Local URI of the document
 * @param bucket Bucket name in Supabase Storage
 * @param userId User ID for naming
 * @param fileType File type (e.g., 'pdf', 'doc')
 * @returns URL of the uploaded document or null if failed
 */
export const uploadDocument = async (
  uri: string,
  bucket: string,
  userId: string,
  fileType: string = 'pdf'
): Promise<string | null> => {
  try {
    const fileName = `${userId}-${fileType}-${Date.now()}.${fileType}`;
    const filePath = `${fileName}`;

    // Read file and convert to base64
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
    
    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, decode(base64), {
        contentType: `application/${fileType}`,
        upsert: true,
      });

    if (error) {
      console.error(`Error uploading ${fileType}:`, error);
      return null;
    }

    // Get public URL
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error(`Error in uploadDocument:`, error);
    return null;
  }
}; 