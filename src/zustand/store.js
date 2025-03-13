import { create } from "zustand";
import userSlice from './slices/user.slice.js';
import testSlice from "./slices/test.slice.js";

// Combine all slices in the store:
const useStore = create((...args) => ({
  ...userSlice(...args),
  ...testSlice(...args),
}))


export default useStore;
