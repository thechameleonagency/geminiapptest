import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRole, UserProfile } from './types';

interface AuthState {
    isAuthenticated: boolean;
    userRole: UserRole | null;
    userProfile: UserProfile | null;
    login: (role: UserRole, profile: UserProfile) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            userRole: null,
            userProfile: null,
            login: (role, profile) => set({ isAuthenticated: true, userRole: role, userProfile: profile }),
            logout: () => set({ isAuthenticated: false, userRole: null, userProfile: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
);

interface UIState {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    sidebarOpen: true,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

interface OnboardingState {
    hasCompletedOnboarding: boolean;
    setOnboardingComplete: (completed: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            hasCompletedOnboarding: false,
            setOnboardingComplete: (completed) => set({ hasCompletedOnboarding: completed }),
        }),
        {
            name: 'onboarding-storage',
        }
    )
);