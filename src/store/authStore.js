import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '@/services/api'

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const { data } = await api.post('/auth/login', { email, password })
          set({
            token: data.token,
            user: data.user,
            isLoading: false,
          })
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          return {
            success: false,
            message: error.response?.data?.message || error.message || 'Login failed',
          }
        }
      },

      verifySession: async () => {
        set((state) => ({ ...state, isLoading: true }))
        try {
          const { data } = await api.get('/auth/verify')
          set((state) => ({
            ...state,
            user: data.user,
            isLoading: false,
          }))
          return true
        } catch {
          set({ token: null, user: null, isLoading: false })
          return false
        }
      },

      logout: async () => {
        try {
          await api.post('/auth/logout')
        } catch {
          // Local cleanup should still succeed if the API is unavailable.
        }
        set({ token: null, user: null, isLoading: false })
      },

      updateUser: (data) =>
        set((state) => ({
          user: { ...state.user, ...data },
        })),
    }),
    {
      name: 'ayra-auth',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
)
