import { createContext, useContext, useEffect, useState } from "react";
import auth, { db } from "../firebase";
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IContextType {
   signUp?: (email: string, password: string) => void;
   logIn: (email: string, password: string) => void;
   logOut?: () => void;
   user?: {
      email?: string;
   };
}

const AuthContext = createContext<IContextType | undefined>(undefined);

export function AuthContextProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const [user, setUser] = useState({});
   const navigate = useNavigate();

   function signUp(email: string, password: string) {
      createUserWithEmailAndPassword(auth, email, password)
         .then(() => {
            setDoc(doc(db, "users", email), {
               savedShows: [],
            });
            navigate("/");
         })
         .catch((error) => {
            toast.error(`${error.message}`, {
               position: "top-center",
            });
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
         currentUser && setUser(currentUser);
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
