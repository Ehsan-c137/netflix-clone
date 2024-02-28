import { Route, Routes } from "react-router-dom";
import Navbar from "./componets/Navbar.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Account from "./pages/Account.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import ProtectedRoute from "./componets/ProtectedRoute.jsx";

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
