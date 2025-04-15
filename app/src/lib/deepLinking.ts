import { supabase } from './supabase';
import Constants from 'expo-constants';

// Get the redirect URL from the environment variables or use a default
const AUTH_REDIRECT_URL = Constants.expoConfig?.extra?.authRedirectUrl || 'intervuai://auth/callback';

/**
 * Deep linking URL configurations for auth
 */
export const DeepLinkingConfig = {
  redirectUrl: AUTH_REDIRECT_URL,
  
  /**
   * Parse the parameters from a URL string
   * @param paramName The parameter name to extract from the URL
   * @param url The URL containing the parameters
   * @returns The parameter value or null if not found
   */
  getParameterByName: (paramName: string, url: string) => {
    // Handle URLs with hash fragments instead of query params
    let processedUrl = url;
    if (url.includes('#')) {
      // Convert hash fragments to query parameters for easier parsing
      processedUrl = url.replace('#', '?');
    }
    
    const name = paramName.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&#]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(processedUrl);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },
  
  /**
   * Handle an auth deep link URL
   * @param url The deep link URL to process
   * @param onSuccess Optional callback function to execute after successful authentication
   * @returns True if the URL was successfully handled, false otherwise
   */
  handleAuthDeepLink: async (url: string, onSuccess?: () => void): Promise<boolean> => {
    if (!url) return false;
    
    console.log('[Deep Link] Processing URL with auth parameters');
    
    // Handle special characters in URL
    const processedUrl = url.includes('#') ? url.replace('#', '?') : url;
    
    // Handle various auth scenarios - check for different parameters
    if (processedUrl.includes('access_token=') || 
        processedUrl.includes('type=recovery') || 
        processedUrl.includes('type=signup')) {
      
      let accessToken;
      let refreshToken;
      
      if (url.includes('#')) {
        // Fragment-style URL
        const fragment = url.split('#')[1];
        const params = new URLSearchParams(fragment);
        accessToken = params.get('access_token');
        refreshToken = params.get('refresh_token');
      } else {
        // Query-style URL
        accessToken = DeepLinkingConfig.getParameterByName('access_token', url);
        refreshToken = DeepLinkingConfig.getParameterByName('refresh_token', url);
      }
      
      console.log('[Deep Link] Setting session with tokens');
      
      if (accessToken && refreshToken) {
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          if (error) {
            console.error('[Deep Link] Error setting session:', error.message);
            return false;
          }
          
          console.log('[Deep Link] Session set successfully, calling navigation callback');
          
          // Call the success callback with a slight delay
          // This ensures the auth state has time to propagate
          if (onSuccess) {
            setTimeout(() => {
              console.log('[Deep Link] Executing navigation callback');
              onSuccess();
            }, 1000); // 1 second delay to ensure state updates
          }
          
          return true;
        } catch (error) {
          console.error('[Deep Link] Error processing:', error);
          return false;
        }
      } else {
        console.log('[Deep Link] Missing tokens in URL - Access Token:', !!accessToken, 'Refresh Token:', !!refreshToken);
      }
    } else {
      console.log('[Deep Link] URL does not contain auth parameters');
    }
    
    return false;
  }
}; 