import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/profile/Profile";
import Users from "./pages/users/Users";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Users />} />

          {/* Single User Profile */}
          <Route path="/user/:id" element={<Profile />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
