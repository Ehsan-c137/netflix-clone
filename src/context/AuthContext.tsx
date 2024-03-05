import {
   createContext,
   useContext,
   useEffect,
   useState,
   PropsWithChildren,
} from "react";
import auth, { db } from "../firebase";
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { getValue } from "@testing-library/user-event/dist/utils";
import React from "react";

interface IContextType {
   signUp?: (email: string, password: string) => void;
   logIn: (email: string, password: string) => void;
   logOut?: () => void;

   user?: any;
}

interface IUser {
   email: string;
   password: string;
}

const AuthContext = createContext<IContextType | undefined>(undefined);

export function AuthContextProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const [user, setUser] = useState({});

   function signUp(email: string, password: string) {
      createUserWithEmailAndPassword(auth, email, password);
      setDoc(doc(db, "users", email), {
         savedShows: [],
      });
   }

   function logIn(email: string, password: string) {
      return signInWithEmailAndPassword(auth, email, password);
   }

   function logOut() {
      return signOut(auth);
   }

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
      });
      return () => {
         unsubscribe();
      };
   }, []);

   const values: IContextType = {
      signUp,
      logIn,
      logOut,
      user,
   };

   return (
      <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
   );
}

export function UserAuth() {
   return useContext(AuthContext) as IContextType;
}
