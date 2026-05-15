import { create } from "zustand";

interface UserState {
  username: string;
  totalLikes: number;
  setUsername: (name: string) => void;
  incrementLikes: () => void;
  decrementLikes: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  username: "Pema Dorji",
  totalLikes: 128,
  setUsername: (name) => set({ username: name }),
  incrementLikes: () => set((state) => ({ totalLikes: state.totalLikes + 1 })),
  decrementLikes: () =>
    set((state) => ({
      totalLikes: state.totalLikes > 0 ? state.totalLikes - 1 : 0,
    })),
}));