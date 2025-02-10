import { create } from "zustand";
import { persist } from "zustand/middleware";
let store = (set) => ({
  isLoggedIn: false,
  email: "",
  firstName: "",
  lastName: "",
  accessToken: "",
  setUserState: (isLoggedIn, email, firstName, lastName, accessToken) => 
    set(() => ({ isLoggedIn , email, firstName, lastName, accessToken  })),
});

//persist the state with key "randomKey"
store = persist(store, { name: "user-store" });

//create the store
let useStore = create(store);


export default useStore;
