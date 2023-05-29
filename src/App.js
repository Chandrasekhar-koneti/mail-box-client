import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./components/Form/Signup";
import SignIn from "./components/Form/Signin";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dummy from "./components/Form/Dummy";

function App() {
  const router=createBrowserRouter([
    {path:'/', element:<SignIn />},
    {path:'/signup',element:<SignUp />},
    {path:'/dummy',element:<Dummy />}
  ])
  return (
    <div>
   <RouterProvider router={router}/>
    </div>
  )
}
export default App;
