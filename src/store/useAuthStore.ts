import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserRole = 'employer' | 'candidate' | null;

interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  } | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;

  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Mock users
const MOCK_USERS = {
  'employer@test.com': {
    id: '1',
    email: 'employer@test.com',
    name: 'Rahim Ahmed',
    role: 'employer' as const,
    password: '123456',
  },
  'candidate@test.com': {
    id: '2',
    email: 'candidate@test.com',
    name: 'Karim Khan',
    role: 'candidate' as const,
    password: '123456',
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,

      login: (email: string, password: string) => {
        const user = MOCK_USERS[email as keyof typeof MOCK_USERS];
        if (user && user.password === password) {
          set({
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            },
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),

    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);