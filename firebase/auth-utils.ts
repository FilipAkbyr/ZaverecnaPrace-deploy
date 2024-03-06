import {
  User,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
  } from 'firebase/auth';
  import { firebase_app } from './config';
import { toast } from 'react-toastify';
  
  
  const auth = getAuth(firebase_app);
  enum Role {
    User,
    Admin
  }
  type MyUser = (User | null | undefined) & { role?: Role, username?: string };
  
  // const [getUser, { error, data }] = useUserDataLazyQuery({
  //   variables: { email: user?.email ?? "" },
  // });
  
  export const authUtils = {
    login: async (email: string, password: string) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in");
        const isLoggedIn = true;
        return true;
    } catch (error : any) {
        switch (error.code) {
            case "auth/invalid-email":
                toast.error("Email incorrect. Please try again.", {containerId: "loginToastId", position: "top-right", autoClose: 2000});       
                break;
            case "auth/wrong-password":
                toast.error("Password incorrect. Please try again.", {containerId: "loginToastId", position: "top-right", autoClose: 2000});
                break;
            case "auth/network-request-failed":
                toast.error("Network error. Please try again.", {containerId: "loginToastId", position: "top-right", autoClose: 2000});
                break;
            default:
            toast.error("Something went wrong. Please try again.", {containerId: "loginToastId", position: "top-right", autoClose: 2000});
        }
        return false;
    }
    },
    logout: async () => {
      await auth.signOut();
    },
    register: async (email: string, password: string) => {
      await createUserWithEmailAndPassword(auth, email, password);
    },
    getCurrentUser: () => auth.currentUser,
    getIdkUser: () => {
      return {...auth.currentUser, role: Role.Admin, username: "Pilif"} as MyUser;
    }
  };

  
  