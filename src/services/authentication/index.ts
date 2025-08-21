import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import http from "../http/httpService";

export interface LoginResponse {
  id: number;
  name: string;
}

interface AuthenticationState {
  user: LoginResponse | null;
  loading: boolean;
  error: string | null;
  hydrated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthenticationStore = create<AuthenticationState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      hydrated: false,

      login: async (username: string, password: string) => {
        try {
          set({ loading: true, error: null });
          const response = await http.post<LoginResponse>("/login", {
            username,
            password,
          });
          set({ user: response.data, loading: false });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          set({ loading: false, error: error?.message });
          throw error;
        }
      },

      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
    }
  )
);
