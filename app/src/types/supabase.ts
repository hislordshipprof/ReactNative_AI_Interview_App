export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          name: string | null;
          avatar_url: string | null;
          resume_url: string | null;
          job_title: string | null;
          industry: string | null;
          experience_level: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          name?: string | null;
          avatar_url?: string | null;
          resume_url?: string | null;
          job_title?: string | null;
          industry?: string | null;
          experience_level?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          name?: string | null;
          avatar_url?: string | null;
          resume_url?: string | null;
          job_title?: string | null;
          industry?: string | null;
          experience_level?: string | null;
        };
      };
      interview_sessions: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          title: string;
          type: string;
          role: string | null;
          company: string | null;
          score: number | null;
          status: string;
          feedback: string | null;
          transcript: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          title: string;
          type: string;
          role?: string | null;
          company?: string | null;
          score?: number | null;
          status: string;
          feedback?: string | null;
          transcript?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          title?: string;
          type?: string;
          role?: string | null;
          company?: string | null;
          score?: number | null;
          status?: string;
          feedback?: string | null;
          transcript?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
} 