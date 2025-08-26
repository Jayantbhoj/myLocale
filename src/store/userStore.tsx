import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isSignedIn: boolean;
  setUser: (first: string, last: string, phone: string, email: string) => void;
  signIn: (first: string, last: string, phone: string, email: string) => void;
  signOut: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      isSignedIn: false,
      setUser: (firstName, lastName, phone, email) =>
        set({ firstName, lastName, phone, email }),
      signIn: (firstName, lastName, phone, email) =>
        set({ firstName, lastName, phone, email, isSignedIn: true }),
      signOut: () =>
        set({ firstName: '', lastName: '', phone: '', email: '', isSignedIn: false }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
