import { create } from "zustand";

const useStore = create((set) => ({
  posts: [],
  users: [],

  setPosts: (posts) => set({ posts }),
  setUsers: (users) => set({ users }),
}));

export default useStore;