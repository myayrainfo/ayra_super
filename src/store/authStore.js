import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          // Replace with real API call
          await new Promise(r => setTimeout(r, 1200))
          if (email === 'admin@ayra.edu' && password === 'Admin@123') {
            const user = {
              id: '1',
              name: 'Super Admin',
              email,
              role: 'superadmin',
              avatar: null,
            }
            set({ token: 'mock-jwt-token', user, isLoading: false })
            return { success: true }
          }
          throw new Error('Invalid credentials')
        } catch (err) {
          set({ isLoading: false })
          return { success: false, message: err.message }
        }
      },

      logout: () => set({ token: null, user: null }),

      updateUser: (data) => set(s => ({ user: { ...s.user, ...data } })),
    }),
    {
      name: 'ayra-auth',
      partialize: s => ({ token: s.token, user: s.user }),
    }
  )
)
