// App Constants

// Colors (matching Tailwind config)
export const COLORS = {
  primary: '#06B6D4',
  primaryDark: '#0891b2',
  primaryLight: '#67e8f9',
  secondary: '#8b5cf6',
  success: '#4CAF50',
  danger: '#f44336',
  warning: '#ff9800',
  info: '#2196F3',
  background: '#f5f5f5',
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6', 
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// Interview Types
export const INTERVIEW_TYPES = [
  { id: 'frontend', name: 'Frontend Developer' },
  { id: 'backend', name: 'Backend Developer' },
  { id: 'fullstack', name: 'Full Stack Developer' },
  { id: 'mobile', name: 'Mobile Developer' },
  { id: 'devops', name: 'DevOps Engineer' },
  { id: 'data', name: 'Data Scientist' },
  { id: 'ml', name: 'Machine Learning Engineer' },
  { id: 'design', name: 'UI/UX Designer' },
];

// Experience Levels
export const EXPERIENCE_LEVELS = [
  { id: 'junior', name: 'Junior (0-2 years)' },
  { id: 'mid', name: 'Mid-level (2-5 years)' },
  { id: 'senior', name: 'Senior (5+ years)' },
];

// Interview Status
export const INTERVIEW_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELED: 'canceled',
};

// Routes
export const ROUTES = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  DASHBOARD: 'Dashboard',
  INTERVIEW_DETAIL: 'InterviewDetail',
  CREATE_INTERVIEW: 'CreateInterview',
  START_INTERVIEW: 'StartInterview',
};

// Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
}; 