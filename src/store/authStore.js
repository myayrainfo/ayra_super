import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,
      message: null, // added to show messages globally

      // OLD LOGIN (COMMENTED)
      /*
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
      */

      //NEW LOGIN 
      login: async () => {
        set({ token: null, user: null, isLoading: true })

        await new Promise(r => setTimeout(r, 500))

        set({
          token: null,
          user: null,
          isLoading: false,
          message: 'LOGIN SERVICES ARE TEMPORARILY UNAVAILABLE',
        })

        return {
          success: false,
          message: 'LOGIN SERVICES ARE TEMPORARILY UNAVAILABLE',
        }
      },

 
      // OLD LOGOUT (COMMENTED)

      /*
      logout: () => set({ token: null, user: null }),
      */

      // NEW LOGOUT (WITH MESSAGE)

      logout: () => {
        localStorage.removeItem('ayra-auth')

        set({
          token: null,
          user: null,
          message: 'LOGIN SERVICES ARE TEMPORARILY UNAVAILABLE',
        })
      },

      updateUser: (data) => set(s => ({ user: { ...s.user, ...data } })),
    }),
    {
      name: 'ayra-auth',
      partialize: s => ({
        token: s.token,
        user: s.user,
      }),
    }
  )
)
