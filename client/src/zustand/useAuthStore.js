import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      // state
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      // actions
      login: (data) => {
        set({
          user: data.user,
          accessToken: data.access,
          refreshToken: data.refresh,
          isAuthenticated: true,
        });
      },

      setTokens: ({ accessToken, refreshToken }) => {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth", // key in local storage
    }
  )
);

export default useAuthStore;
