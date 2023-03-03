import { Route, Routes } from "react-router-dom";
import Navbar from "./componets/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account.jsx";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./componets/ProtectedRoute";

function App() {
   return (
      <>
         <AuthContextProvider>
            <Navbar />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
               <Route
                  path="/account"
                  element={
                     <ProtectedRoute>
                        <Account />
                     </ProtectedRoute>
                  }
               />
               <Route path="*" element={<PageNotFound />} />
            </Routes>
         </AuthContextProvider>
      </>
   );
}

export default App;
