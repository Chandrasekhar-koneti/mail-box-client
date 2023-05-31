import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./components/Form/Signup";
import SignIn from "./components/Form/Signin";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Welcome from "./components/Pages/Welcome";
import Mail from "./components/Pages/Mail";
import Inbox from "./components/Pages/Inbox";

function App() {
  const router=createBrowserRouter([
    {path:'/', element:<SignIn />},
    {path:'/signup',element:<SignUp />},
    {path:'/welcome',element:<Welcome />},
    {path:'/Mail',element:<Mail /> },
    {path:'/Inbox',element:<Inbox />}
  ])
  return (
    <div>
   <RouterProvider router={router}/>
    </div>
  )
}
export default App;
