import { User } from "../types/user";

export interface AuthResponse {
  user: User | null;
  error: string | null;
  status: number;
}

export const mockAuthService = {
  users: new Map<string, User>(),
  currentUser: null as User | null,

  register: async (email: string, password: string, name: string, company?: string): Promise<AuthResponse> => {
    console.log("Mock: Registering user", { email, name, company });
    
    if (mockAuthService.users.has(email)) {
      return {
        user: null,
        error: "Dit emailadres is al geregistreerd. Probeer in te loggen.",
        status: 409
      };
    }

    const user: User = {
      id: `mock_${Date.now()}`,
      email,
      name,
      company: company || "Mock Company"
    };

    mockAuthService.users.set(email, user);
    mockAuthService.currentUser = user;

    console.log("Mock: User registered successfully", user);
    
    return {
      user,
      error: null,
      status: 200
    };
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    console.log("Mock: Logging in user", { email });
    
    const user = mockAuthService.users.get(email);
    
    if (!user) {
      return {
        user: null,
        error: "Ongeldige inloggegevens. Controleer je email en wachtwoord.",
        status: 401
      };
    }

    mockAuthService.currentUser = user;

    console.log("Mock: User logged in successfully", user);
    
    return {
      user,
      error: null,
      status: 200
    };
  },

  logout: async (): Promise<{ error: string | null }> => {
    console.log("Mock: Logging out user");
    mockAuthService.currentUser = null;
    return { error: null };
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    console.log("Mock: Getting current user");
    
    if (mockAuthService.currentUser) {
      return {
        user: mockAuthService.currentUser,
        error: null,
        status: 200
      };
    }

    return {
      user: null,
      error: "Geen gebruiker ingelogd",
      status: 401
    };
  },

  updateUser: async (userId: string, userData: Partial<User>): Promise<AuthResponse> => {
    console.log("Mock: Updating user", { userId, userData });
    
    if (!mockAuthService.currentUser || mockAuthService.currentUser.id !== userId) {
      return {
        user: null,
        error: "Gebruiker niet gevonden",
        status: 404
      };
    }

    const updatedUser = { ...mockAuthService.currentUser, ...userData };
    mockAuthService.currentUser = updatedUser;
    mockAuthService.users.set(updatedUser.email, updatedUser);

    console.log("Mock: User updated successfully", updatedUser);
    
    return {
      user: updatedUser,
      error: null,
      status: 200
    };
  },

  resetPassword: async (email: string): Promise<{ error: string | null }> => {
    console.log("Mock: Resetting password for", email);
    
    if (!mockAuthService.users.has(email)) {
      return { error: "Emailadres niet gevonden" };
    }

    console.log("Mock: Password reset email sent (simulated)");
    return { error: null };
  },

  updatePassword: async (password: string): Promise<{ error: string | null }> => {
    console.log("Mock: Updating password");
    
    if (!mockAuthService.currentUser) {
      return { error: "Geen gebruiker ingelogd" };
    }

    console.log("Mock: Password updated successfully (simulated)");
    return { error: null };
  }
};
