// Mock Auth Service Only
import { mockAuthService } from "./mock-auth-service";
import { User } from "../types/user";

export interface AuthResponse {
  user: User | null;
  error: string | null;
  status: number;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    console.log("Using mock auth service for login");
    return await mockAuthService.login(email, password);
  },
  
  register: async (email: string, password: string, name: string, company?: string): Promise<AuthResponse> => {
    console.log("Using mock auth service for registration");
    return await mockAuthService.register(email, password, name, company);
  },
  
  logout: async (): Promise<{ error: string | null }> => {
    console.log("Using mock auth service for logout");
    return await mockAuthService.logout();
  },
  
  getCurrentUser: async (): Promise<AuthResponse> => {
    console.log("Using mock auth service for getCurrentUser");
    return await mockAuthService.getCurrentUser();
  },
  
  updateUser: async (userId: string, userData: Partial<User>): Promise<AuthResponse> => {
    console.log("Using mock auth service for updateUser");
    return await mockAuthService.updateUser(userId, userData);
  },
  
  resetPassword: async (email: string): Promise<{ error: string | null }> => {
    console.log("Using mock auth service for resetPassword");
    return await mockAuthService.resetPassword(email);
  },
  
  updatePassword: async (password: string): Promise<{ error: string | null }> => {
    console.log("Using mock auth service for updatePassword");
    return await mockAuthService.updatePassword(password);
  },
  
  getOrCreateUserProfile: async (userId: string, email: string, metadata?: any) => {
    return {
      id: userId,
      email: email,
      full_name: metadata?.full_name || "Mock User",
      company_name: metadata?.company_name || "Mock Company",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }
};
