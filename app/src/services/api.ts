import Constants from 'expo-constants';

// Base configuration for API calls
const BASE_URL = Constants.expoConfig?.extra?.baseUrl || process.env.BASE_URL;
const VAPI_WEB_TOKEN = Constants.expoConfig?.extra?.vapiWebToken || process.env.VAPI_WEB_TOKEN;
const VAPI_WORKFLOW_ID = Constants.expoConfig?.extra?.vapiWorkflowId || process.env.VAPI_WORKFLOW_ID;
const GOOGLE_API_KEY = Constants.expoConfig?.extra?.googleApiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

// Interview API functions - these would connect to Vapi for voice interviews
export const apiService = {
  // Start a new interview session
  startInterview: async (interviewData: any) => {
    try {
      // This is a placeholder for real API call to Vapi
      // In a real implementation, this would start a voice conversation
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        sessionId: `session-${Date.now()}`,
        sessionData: {
          ...interviewData,
          startTime: new Date().toISOString(),
        }
      };
    } catch (error) {
      console.error('Failed to start interview:', error);
      throw error;
    }
  },
  
  // End an interview session
  endInterview: async (sessionId: string) => {
    try {
      // This is a placeholder for real API call
      // In a real implementation, this would end the voice session
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        sessionId,
        endTime: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Failed to end interview:', error);
      throw error;
    }
  },
  
  // Get interview feedback using AI
  getInterviewFeedback: async (transcript: string, jobPosition: string) => {
    try {
      // This is a placeholder for real API call to Google's Gemini API
      // In a real implementation, this would process the transcript and generate feedback
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulated feedback
      return {
        feedback: `Overall, your responses were well-structured and covered the core concepts. You demonstrated strong knowledge of web development fundamentals. Consider providing more specific examples from your past projects when discussing problem-solving approaches. Your communication was clear, but try to be more concise in technical explanations.`,
        strengths: [
          'Strong technical knowledge',
          'Well-structured responses',
          'Good communication skills'
        ],
        improvements: [
          'Include more specific examples',
          'Be more concise in technical explanations',
          'Elaborate more on problem-solving approaches'
        ],
        score: 85
      };
    } catch (error) {
      console.error('Failed to get interview feedback:', error);
      throw error;
    }
  }
};

export default apiService; 