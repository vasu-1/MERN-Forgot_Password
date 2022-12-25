import "./App.css";
import LoginScreen from "./component/login_screen";
import NavScreen from "./component/Navbar";
import ForgotScreen from "./component/Forgot_screen";
import ResetScreen from "./component/Reset_screen";
import mainpage from "./component/mainpage.jpg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupScreen from "./component/Signup_screen";

var frontPage = (
  <div className="m-5 p-2">
    <div className="contentimg">
      <img className="frontpageimg" alt="front" src={mainpage} />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: frontPage,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/forgot_password",
    element: <ForgotScreen />,
  },
  {
    path: "/signup",
    element: <SignupScreen />,
  },
  {
    path: "/ResetScreen",
    element: <ResetScreen />,
  },
]);

function App() {
  return (
    <div>
      <NavScreen />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
